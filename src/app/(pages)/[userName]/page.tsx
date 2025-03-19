// import { useTranslations } from "next-intl";
// import Box from "@/components/home/box";
import { getUserWithBoxAndNav } from "@/services/user_page";
export default async function Pages({ params }: { params: any }) {
  // const t = useTranslations("HomePage");
  const { userName } = await params;
  const { data } = await getUserWithBoxAndNav(userName);
  console.log(data, "data>>");
  return (
    <div
      className="bg-[#868686]
        bg-[url('/spsc.jpeg')]
        bg-repeat bg-[50%_-500px]
        bg-fixed min-h-[100vh]
        grid grid-cols-1 gap-4 
        sm:grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 xl:grid-cols-4 
        p-5"
    >
      {/* userName: {userName} */}

      {data.box.map((item) => {
        return <Card key={item.title} item={item} />;
      })}
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
      <div className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]">
        sd
      </div>
    </div>
  );
}

function Card(item) {
  return (
    <div
      key={item.title}
      className="text-[#f7f7f7] rounded-lg bg-[#0e0e0e3d] min-h-[25vh]"
    >
      {item.title}
    </div>
  );
}
