"use client";
import { useLocale, useTranslations } from "next-intl";
import Select from "./hero/Select";
import { useTransition } from "react";
import clsx from "clsx";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
export default function LocaleSwitcher() {
  const t = useTranslations("global");
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  function onChange(value: { currentKey: string }) {
    const locale = value.currentKey as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }
  return (
    <>
      <Select
        className={clsx(
          "rounded-sm p-2 transition-colors hover:bg-slate-200",
          isPending && "pointer-events-none opacity-60"
        )}
        selectedKeys={[locale]}
        items={[
          {
            value: "en",
            label: t("en"),
          },
          {
            value: "zh",
            label: t("zh"),
          },
        ]}
        onSelectionChange={onChange}
      />
    </>
  );
}
