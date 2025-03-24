import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Aggregation of navigation",
  description: "Aggregation of navigation",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true}>
      <body>
        {/* {children} */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
