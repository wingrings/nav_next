// import { useTranslations } from "next-intl";
// import Box from "@/components/home/box";
import { getUserWithBoxAndNav } from "@/services/user_page";
export default async function Pages({ params }: { params: any }) {
  // const t = useTranslations("HomePage");
  const { userName } = await params;
  const data = await getUserWithBoxAndNav(userName);
  console.log(data, "data>>");
  return (
    <div className="min-h-[100vh] grid grid-cols-3 gap-4 p-5 bg-slate-300">
      userName: {userName}
    </div>
  );
}
