"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/services/login";
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
  Avatar,
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
  classNames = {},
}: {
  name?: string;
  navItems?: { label: string; href: string }[];
  menuItems?: { label: string; href: string }[];
  rightContent?: React.ReactNode;
  classNames?: any;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <NavbarHero classNames={{ ...classNames }} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-white flex items-center gap-3">
            <Avatar
              size="sm"
              isBordered
              color="default"
              src="https://heroui.com/images/album-cover.png"
            />
            {name || "nav"}
          </p>
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
          {/* <Link href="/login"> */}
          {rightContent ? (
            rightContent
          ) : (
            <Button
              variant="ghost"
              size="sm"
              color="secondary"
              onPress={logout.bind(null)}
            >
              退出
            </Button>
          )}
          {/* </Link> */}
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
