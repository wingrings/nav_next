"use client";
import React from "react";
import { Button as ButtonHero } from "@heroui/react";

import clsx from "clsx";
export default function Button(props: any) {
  return <ButtonHero {...{ size: "sm", ...props }}></ButtonHero>;
}
export function ButtonNice(props: any) {
  return (
    <ButtonHero
      {...{
        size: "sm",
        ...props,
        className: clsx(
          "bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg",
          props?.className
        ),
      }}
    ></ButtonHero>
  );
}
export function ButtonPink(props: any) {
  return (
    <ButtonHero
      {...{
        size: "sm",
        ...props,
        className: clsx("bg-pink-500 text-white shadow-lg", props?.className),
      }}
    ></ButtonHero>
  );
}
export function ButtonPinkBorder(props: any) {
  return (
    <ButtonHero
      {...{
        size: "sm",
        ...props,
        className: clsx("btn-pink bg-white", props?.className),
      }}
    ></ButtonHero>
  );
}
