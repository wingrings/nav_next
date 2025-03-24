"use client";
import React from "react";
import { delBoxData } from "@/services/box";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/react";
import {
  ButtonPinkBorder,
  // PopConfirm
} from "@/components/hero";
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
    // <PopConfirm onConfirm={delBox}>
    //   <ButtonPinkBorder>删除</ButtonPinkBorder>
    // </PopConfirm>
    <ButtonPinkBorder onPress={delBox}>删除</ButtonPinkBorder>
  );
}
