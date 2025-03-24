import type { Metadata } from "next";

import HomeLayout from "@/components/layout/home_layout";

export const metadata: Metadata = {
  title: "Aggregation of navigation",
  description: "一些使用的工具",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeLayout>{children}</HomeLayout>;
}
