import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "@/components/hero/providers";
import "./globals.css";

const langMap: { [key: string]: string } = {
  zh: "zh-CN",
  en: "en-US",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers locale={langMap[locale]} className="">
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
