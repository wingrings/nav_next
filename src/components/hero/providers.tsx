"use client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={20} />
      {children}
    </HeroUIProvider>
  );
}
