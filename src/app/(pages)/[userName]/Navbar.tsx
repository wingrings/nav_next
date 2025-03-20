"use client";
import React from "react";
import {
  Navbar as NavbarHero,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

export default function Navbar({
  classNames,
  children,
}: {
  classNames: {
    navbar: string;
  };
  children: React.ReactNode;
}) {
  return (
    <NavbarHero
      classNames={{
        base: "h-5",
        wrapper: "h-5",
        brand: "h-5",
        content: "h-5",
        item: "h-5",
      }}
      className={classNames.navbar}
    >
      <NavbarBrand></NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>{children}</NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex"></NavbarItem>
      </NavbarContent>
    </NavbarHero>
  );
}
