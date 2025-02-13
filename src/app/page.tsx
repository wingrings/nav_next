import { useTranslations } from "next-intl";
import DateInput from "@/components/hero/DateInput";
import RangeCalendar from "@/components/hero/RangeCalendar";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <>
      <LocaleSwitcher />
      <h1>{t("title")}</h1>;
      <RangeCalendar />
      <DateInput />
    </>
  );
}
