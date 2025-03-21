"use client";
import React, { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { logout } from "@/services/login";
import { clsx } from "clsx";
import { getTokenMsg } from "@/services/login";
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
import { ButtonPink } from "@/components/hero";
const navItems = [
  { label: "主页", href: "/home" },
  { label: "盒子", href: "/box" },
  { label: "链接", href: "/nav" },
];

const menuItems = [
  { label: "主页", href: "/home" },
  { label: "盒子", href: "/box" },
  { label: "导航链接", href: "/nav" },
];
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tokenMsg, setTokenMsg] = useState<Record<string, any> | null>(null);
  useLayoutEffect(() => {
    getTokenMsg().then((value) => {
      setTokenMsg(value);
    });
  }, []);
  // 获取当前路由
  async function handleLogout() {
    await logout();
    const value = await getTokenMsg();
    setTokenMsg(value);
  }
  return (
    <>
      <Navbar
        navItems={tokenMsg === null ? [] : navItems}
        menuItems={menuItems}
        name={tokenMsg?.name}
        rightContent={
          tokenMsg === null ? (
            <div className="flex gap-4">
              <Link href="/login">
                <ButtonPink>登 录</ButtonPink>
              </Link>
              <Link href="/setup">
                <Button size="sm" className="btn-pink bg-white">
                  注 册
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              size="sm"
              className="btn-pink bg-white"
              onPress={handleLogout}
            >
              退 出
            </Button>
          )
        }
      ></Navbar>
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
  avatar,
}: {
  name?: string;
  navItems?: { label: string; href: string }[];
  menuItems?: { label: string; href: string }[];
  rightContent?: React.ReactNode;
  classNames?: any;
  avatar?: any;
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
          <Link href={name ? `/${name}` : "/home"}>
            <p className="font-bold flex items-center gap-3 text-pink-500">
              <Avatar
                {...{
                  size: "sm",
                  isBordered: true,
                  color: "default",
                  src: "https://heroui.com/images/album-cover.png",
                  ...avatar,
                }}
              />
              {name}
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems?.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              className={clsx(
                pathName === item.href ? "text-pink-500" : "text-[#a3a3a3]"
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">{rightContent}</NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems?.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link className="w-full text-white" href={item.href} size="lg">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarHero>
  );
}
