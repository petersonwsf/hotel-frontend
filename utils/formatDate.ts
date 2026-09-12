export function formatShortDate(dataStr: string | Date): string {
  const data = new Date(`${dataStr}T00:00:00`);
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
  });
  const resultado = formatador.format(data).replace('.', '').replace('de', '');
  return resultado.replace(/\s(\w)/, (m) => m.toUpperCase());
}

export const formatDateToPtBR = (dateString: string) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return dateString;
  return `${day}/${month}/${year}`;
};

export function formatDateTimeToPtBR(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}