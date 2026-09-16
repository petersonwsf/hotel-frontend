export const formatCPF = (value: string): string => {
    if (!value) return '';
    
    // Remove tudo o que não for dígito
    const digits = value.replace(/\D/g, '').slice(0, 11);
    
    // Aplica a máscara progressivamente
    return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatPhone = (value: string): string => {
    if (!value) return '';

    // Remove tudo o que não for dígito
    let digits = value.replace(/\D/g, '').slice(0, 11);

    // Se a pessoa digitou 10 dígitos (ex: 8188884444) e o DDD já foi preenchido,
    // insere automaticamente o dígito 9 após o DDD para padronizar
    if (digits.length === 10 && digits[2] !== '9') {
        digits = `${digits.slice(0, 2)}9${digits.slice(2)}`;
    }

    // Aplica a máscara dinâmica para celulares (11 dígitos) ou fixo/incompleto (10 dígitos)
    if (digits.length <= 10) {
        return digits
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    }

    return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
};