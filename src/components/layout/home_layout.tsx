"use client";
import { Layout } from "antd";
import Link from "next/link";

const { Header, Footer, Content } = Layout;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Header>
        <div className="text-white flex gap-5">
          <Link href={"/home"}>主页</Link>
          <Link href={"/dome"}>dome</Link>
        </div>
      </Header>
      <Content>
        <div className="min-h-screen border">{children}</div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
