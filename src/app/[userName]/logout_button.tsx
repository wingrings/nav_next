"use client";
import React, { useEffect } from "react";
import { Button } from "@heroui/react";
import { logout, deleteToken } from "@/services/login";
import { useRouter } from "next/navigation";

export default function LogoutButton({ tokenMsg }: any) {
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.refresh();
  }
  useEffect(() => {
    if (!tokenMsg) {
      deleteToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!tokenMsg) return null;
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
