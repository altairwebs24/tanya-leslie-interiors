export const DEFAULT_WHATSAPP_NUMBER = "0601910837";

export function normalizeSouthAfricanWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("27")) return digits;
  if (digits.startsWith("0")) return `27${digits.slice(1)}`;
  return digits;
}

export function buildWhatsAppUrl(message: string, phone = DEFAULT_WHATSAPP_NUMBER): string {
  const number = normalizeSouthAfricanWhatsAppNumber(phone);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}