"use client";
import React, { useEffect, useState } from "react";
import { ButtonPinkBorder, Link } from "@/components/hero";
import { getRouterParams } from "@/services";
export default function BackButton(Props: any) {
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    getRouterParams().then((routerParams) => {
      if (typeof routerParams === "object" && routerParams !== null) {
        setRedirect(routerParams.redirect ?? "");
      } else {
        setRedirect("");
      }
    });
  }, []);

  return (
    <Link href={redirect ? redirect : "/home"} className="w-full">
      <ButtonPinkBorder
        {...{
          children: "返 回",
          ...Props,
        }}
      ></ButtonPinkBorder>
    </Link>
  );
}
