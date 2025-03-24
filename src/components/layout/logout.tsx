"use client";
import React, { useEffect, useState } from "react";
import { logout, deleteToken, getTokenMsg } from "@/services/login";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
export default function LogoutButton({ children }: any) {
  const [tokenMsg, setTokenMsg] = useState<Record<string, any> | null>(null);
  const router = useRouter();
  async function handleLogout() {
    await logout();
    setTokenMsg(null);
    router.refresh();
  }
  useEffect(() => {
    getTokenMsg().then((value) => {
      setTokenMsg(value);
      if (!value) {
        deleteToken();
      }
    });
  }, []);
  if (!tokenMsg) return null;
  return (
    <div onClick={handleLogout}>
      {children ? (
        children
      ) : (
        <Button
          onPress={handleLogout}
          size="sm"
          className="btn-pink border-2 border-pink-500"
          variant="ghost"
        >
          退 出
        </Button>
      )}
    </div>
  );
}
