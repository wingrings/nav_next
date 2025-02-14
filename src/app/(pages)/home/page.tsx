import { useTranslations } from "next-intl";
import DateInput from "@/components/hero/DateInput";
import RangeCalendar from "@/components/hero/RangeCalendar";
import Test from "./Test";

export default function Pages() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <Test></Test>
      <RangeCalendar />
      <DateInput />
    </div>
  );
}
