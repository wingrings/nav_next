"use client";
import React from "react";
import { Button } from "@heroui/react";
import Logout from "./logout";

export default function LogoutButton() {
  return (
    <Logout>
      <Button
        size="sm"
        className="btn-pink border-2 border-pink-500"
        variant="ghost"
      >
        退 出
      </Button>
    </Logout>
  );
}
