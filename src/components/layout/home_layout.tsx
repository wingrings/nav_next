"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
// import Link from "next/link";
import {
  Navbar as NavbarHero,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  // Avatar,
  Button,
} from "@heroui/react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "主页", href: "/home" },
    { label: "盒子", href: "/box" },
    { label: "导航", href: "/nav" },
  ];

  const menuItems = [
    { label: "主页", href: "/home" },
    { label: "盒子", href: "/box" },
    { label: "退出", href: "logout" },
  ];
  // 获取当前路由

  return (
    <>
      <Navbar navItems={navItems} menuItems={menuItems}></Navbar>
      <div className="min-h-screen border bg-white">{children}</div>
    </>
  );
}

export function Navbar({
  name,
  navItems,
  menuItems,
  rightContent,
}: {
  name?: string;
  navItems?: { label: string; href: string }[];
  menuItems?: { label: string; href: string }[];
  rightContent?: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <NavbarHero
      classNames={{
        base: "bg-[#0e0e0eaa]",
        // wrapper: "bg-[#0e0e0e3d]",
        // brand: "bg-[#0e0e0e3d]",
        // content: "bg-[#0e0e0e3d]",
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-white">{name || "nav"}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems?.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              color={pathName === item.href ? "secondary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">
            {rightContent ? (
              rightContent
            ) : (
              <Button size="sm" color="secondary">
                登录
              </Button>
            )}
          </Link>
        </NavbarItem>
        {/* <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem> */}
      </NavbarContent>
      <NavbarMenu>
        {menuItems?.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link className="w-full text-slate-300" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarHero>
  );
}
