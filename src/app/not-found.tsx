// import Link from 'next/link';
// import { staticRouter } from '@/static/staticRouter';
// import { Result } from 'next';
import { useTranslations } from "next-intl";

import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
export default function NotFound() {
  const t = useTranslations("HomePage");

  return (
    <Tooltip content={t("title")}>
      <Button>{t("title")}</Button>
    </Tooltip>
  );
}
