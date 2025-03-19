"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Layout } from "antd";
// import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";

const { Footer, Content } = Layout;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  const pathName = usePathname();

  return (
    <Layout>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-white">nav</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navItems.map((item) => (
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
              <Button size="sm" color="secondary">
                登录
              </Button>
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem> */}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <Content>
        <div className="min-h-screen border bg-white">{children}</div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
