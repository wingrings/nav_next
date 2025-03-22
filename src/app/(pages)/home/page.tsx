// import { useTranslations } from "next-intl";
import Client from "./client";
// import Box from "@/components/home/box";

export default async function Pages() {
  // const t = useTranslations("HomePage");

  return (
    <div className="min-h-[100vh] grid grid-cols-2 p-5 bg-[#0e0e0e3d]">
      <div>这里是一些说明</div>
      <Client />
    </div>
  );
}
