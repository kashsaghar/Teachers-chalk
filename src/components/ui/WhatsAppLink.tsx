"use client";

import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppLink({
  context,
  message,
  className,
  children,
}: {
  context: string;
  message?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick(context)}
      className={className}
    >
      {children}
    </a>
  );
}
