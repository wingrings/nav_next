// import { useTranslations } from "next-intl";
import Client from "./client";
// import Box from "@/components/home/box";

export default async function Pages() {
  // const t = useTranslations("HomePage");
  return (
    <div className="min-h-[100vh] grid grid-cols-3 gap-4 p-5 bg-slate-300">
      <Client />
    </div>
  );
}
