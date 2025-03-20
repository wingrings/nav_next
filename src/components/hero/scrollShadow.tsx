"use client";
import { ScrollShadow as ScrollShadowHero } from "@heroui/react";
export default function ScrollShadow(props: {
  children: React.ReactNode;
  size?: number;
  className?: string;
}) {
  return <ScrollShadowHero {...props}></ScrollShadowHero>;
}
