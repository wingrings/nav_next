// import { NextIntlClientProvider } from "next-intl";
// import { getLocale, getMessages } from "next-intl/server";
import Providers from "@/components/hero/providers";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const locale = await getLocale();
  // const messages = await getMessages();
  return (
    <>
      {/* <NextIntlClientProvider locale={locale} messages={messages}>
        <Providers>{children}</Providers>
      </NextIntlClientProvider> */}
      <Providers>{children}</Providers>
    </>
  );
}
