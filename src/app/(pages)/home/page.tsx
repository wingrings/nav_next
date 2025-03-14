// import { useTranslations } from "next-intl";
import Client from "./client";
// import Box from "@/components/home/box";
import { db } from "@/db";
// import { getBoxList } from "@/services/data";

export default async function Pages() {
  // await setBoxList();

  db.snippet
    .create({
      data: {
        title: "test",
        code: "test",
      },
    })
    .then(console.log);

  // const data = await getBoxList();
  // console.log(data, "data");
  // setBoxList();
  // const t = useTranslations("HomePage");
  return (
    <div className="min-h-[100vh] grid grid-cols-3 gap-4 p-5 bg-slate-300">
      {/* {data.arr.map((item, index) => {
        return <Box key={index} data={item} />;
      })} */}
      <Client />
    </div>
  );
}
