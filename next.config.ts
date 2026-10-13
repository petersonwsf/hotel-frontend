import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera apenas os arquivos necessários para produção (usado pelo Dockerfile)
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9003",
      },
    ],
  },
};

export default nextConfig;
