// import { useTranslations } from "next-intl";
// import Box from "@/components/home/box";
import ScrollShadow from "@/components/hero/scrollShadow";
import { getUserWithBoxAndNav } from "@/services/user_page";
import Link from "next/link";
import Navbar from "./Navbar";
import TooltipHero from "@/components/hero/Tooltip";

export default async function Pages({ params }: { params: any }) {
  // const t = useTranslations("HomePage");
  const { userName } = await params;
  const { data } = await getUserWithBoxAndNav(userName);
  console.log(data, "data");
  return (
    <div
      className="bg-[#868686]
        bg-[url('/psc.jpeg')]
        bg-repeat bg-[50%_-500px]
        bg-fixed min-h-[100vh]
        grid grid-cols-1 gap-4 
        sm:grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 xl:grid-cols-4 
        p-5"
    >
      {/* userName: {userName} */}
      {data?.box?.map((item) => {
        return <Card key={item.title} item={item} />;
      })}
    </div>
  );
}

function Card({ item }: { item: any }) {
  return (
    <div className="text-[#f7f7f7] rounded-medium overflow-hidden bg-[#0e0e0e3d] pt-1 pb-2 h-[24vh]">
      <Navbar classNames={{ navbar: "h-5 z-10" }}>
        <span className="text-center font-bold">{item.title}</span>
      </Navbar>
      <ScrollShadow className="h-[calc(100%-20px)]" size={10}>
        <main className="grid grid-cols-3 gap-2 px-2">
          {item?.nav?.map((item: any) => {
            return <NavList key={item.title} item={item} />;
          })}
        </main>
      </ScrollShadow>
    </div>
  );
}

function NavList({ item }: { item: any }) {
  const text = <span className="truncate">{item.title}</span>;
  const content = (
    <div>
      <div className="truncate">{item.title}</div>
      <div className="truncate">{item.memo}</div>
    </div>
  );
  return (
    <Link target="_blank" href={item.link} className="text-sm">
      <div className="h-8 flex items-center justify-center">
        {item.memo ? <TooltipHero content={content}>{text}</TooltipHero> : text}
      </div>
    </Link>
  );
}
