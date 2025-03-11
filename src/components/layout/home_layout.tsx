"use client";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Header>
        <div className="text-white">Header</div>
      </Header>
      <Content>
        <div className="min-h-screen border">{children}</div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
