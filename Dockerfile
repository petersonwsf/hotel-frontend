# =============================================================================
# Imagem base compartilhada entre os estágios de instalação e build.
# Fixamos a versão exata para garantir reprodutibilidade (sem 'latest').
# Alpine é escolhido por ser ~3x menor que a variante Debian slim.
# libc6-compat é necessário para bindings nativos (incluindo sharp) no Alpine.
# =============================================================================
FROM node:22.11.0-alpine AS base
RUN apk add --no-cache libc6-compat

# =============================================================================
# Estágio 1 — deps
# Instala apenas as dependências de produção com npm ci (respeita o lock file).
# Separar este estágio do builder maximiza o cache de camadas:
# se só o código-fonte mudar, as deps não são reinstaladas.
# =============================================================================
FROM base AS deps
WORKDIR /app

# Copia apenas os manifestos de dependências primeiro
COPY package.json package-lock.json ./

# npm ci garante instalação limpa e determinística a partir do lock file
RUN npm ci

# =============================================================================
# Estágio 2 — builder
# Compila a aplicação com next build.
# As variáveis NEXT_PUBLIC_* precisam estar disponíveis AQUI (build time)
# porque o Next.js as injeta estaticamente no bundle do cliente.
# Elas são declaradas como ARG para serem passadas via --build-arg no compose.
# =============================================================================
FROM base AS builder
WORKDIR /app

# Desabilita telemetria do Next.js durante o build
ENV NEXT_TELEMETRY_DISABLED=1

# Variáveis públicas (injetadas no bundle do cliente durante o build).
# NUNCA coloque segredos de servidor aqui.
ARG NEXT_PUBLIC_STRIPE_PUBLIC_KEY
ARG NEXT_PUBLIC_URL_API_PAYMENT
ARG NEXT_PUBLIC_URL_MINIO

# Expõe os ARGs como ENV para que o compilador do Next.js os enxergue
ENV NEXT_PUBLIC_STRIPE_PUBLIC_KEY=$NEXT_PUBLIC_STRIPE_PUBLIC_KEY
ENV NEXT_PUBLIC_URL_API_PAYMENT=$NEXT_PUBLIC_URL_API_PAYMENT
ENV NEXT_PUBLIC_URL_MINIO=$NEXT_PUBLIC_URL_MINIO

# Copia node_modules instalados no estágio anterior
COPY --from=deps /app/node_modules ./node_modules

# Copia o restante do código-fonte
COPY . .

# Executa o build; gera .next/standalone graças ao output: 'standalone' no next.config.ts
RUN npm run build

# =============================================================================
# Estágio 3 — runner (imagem final de produção)
# Copia apenas o estritamente necessário do builder:
#   - .next/standalone  → servidor Node.js minimalista gerado pelo Next.js
#   - .next/static      → assets estáticos (JS/CSS chunks)
#   - public            → arquivos públicos (imagens, ícones, etc.)
# sharp é reinstalado aqui para garantir que o binário Linux/Alpine seja
# utilizado na imagem final, independente de onde o build foi executado.
# =============================================================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Porta padrão; pode ser sobrescrita em runtime via variável de ambiente PORT
ENV PORT=3000
# Necessário para que o servidor seja acessível por outros contêineres na rede Docker
ENV HOSTNAME=0.0.0.0

# Instala sharp diretamente na imagem final para otimização de imagens no servidor.
# É reinstalado aqui (em vez de copiado do builder) para garantir o binário
# correto para a arquitetura Linux/Alpine do contêiner de produção.
RUN npm install --os=linux --libc=musl sharp@0.33.5 --no-save

# Cria grupo e usuário sem privilégios para execução segura (não-root)
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copia apenas os artefatos necessários do estágio builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Muda para o usuário não-root antes de iniciar o processo
USER nextjs

EXPOSE 3000

# Healthcheck usando Node.js puro, sem dependência de curl/wget
# Verifica se o servidor está respondendo na raiz antes de marcar como saudável
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/', (r) => { process.exit(r.statusCode >= 200 && r.statusCode < 400 ? 0 : 1) }).on('error', () => process.exit(1))"

# Entrypoint gerado pelo output standalone do Next.js
CMD ["node", "server.js"]
