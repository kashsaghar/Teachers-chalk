const DEFAULT_NUMBER = "923338760377";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_NUMBER;
}

export function getWhatsAppLink(message?: string): string {
  const number = getWhatsAppNumber();
  const text = message ?? "Hi! I'd like to book a free demo class at Teacher's Chalk.";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
