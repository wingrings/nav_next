// app/providers.tsx
"use client";
import { HeroUIProvider } from "@heroui/react";

export function Providers({
  children,
  className,
  locale,
}: {
  children: React.ReactNode;
  className: string;
  locale: string;
}) {
  return (
    <HeroUIProvider locale={locale} className={className}>
      {children}
    </HeroUIProvider>
  );
}
