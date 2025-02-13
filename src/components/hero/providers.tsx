// app/providers.tsx
"use client";
import { HeroUIProvider } from "@heroui/react";

const langMap: { [key: string]: string } = {
  zh: "zh-CN",
  en: "en-US",
};
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
    <HeroUIProvider locale={langMap[locale]} className={className}>
      {children}
    </HeroUIProvider>
  );
}
