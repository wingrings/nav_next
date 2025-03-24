// import { useTranslations } from "next-intl";
import Client from "./client";
// import Box from "@/components/home/box";

export default async function Pages() {
  // const t = useTranslations("HomePage");

  return (
    <div className="min-h-[100vh] grid grid-cols-1 md:grid-cols-2 p-5 bg-[#0e0e0e3d]">
      <div className="hidden md:block">
        <div
          className="w-full flex justify-center h-full items-center text-pink-500"
          style={{ writingMode: "vertical-rl" }}
        >
          这个功能不能用，服务器资源有限，正在想办法中。。。
        </div>
      </div>
      <Client />
    </div>
  );
}
