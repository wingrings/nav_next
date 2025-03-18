"use client";
import React from "react";
import { delBoxData } from "@/services/box";
import { useRouter } from "next/navigation";
import { Button, addToast } from "@heroui/react";
export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  async function delBox() {
    const res = await delBoxData(id);
    if (!res.success) {
      addToast({
        description: res.message,
        color: "danger",
      });
      return;
    }
    addToast({
      description: "删除成功",
      color: "success",
    });
    router.push("/box");
  }
  return (
    <Button size="sm" color="danger" onPress={delBox}>
      删除
    </Button>
  );
}
