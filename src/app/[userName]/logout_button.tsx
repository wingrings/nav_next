"use client";
import React from "react";
import { Button } from "@heroui/react";
import { logout } from "@/services/login";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.refresh();
  }
  return (
    <Button
      size="sm"
      className="btn-pink border-2 border-pink-500"
      onPress={handleLogout}
      variant="ghost"
    >
      退 出
    </Button>
  );
}
