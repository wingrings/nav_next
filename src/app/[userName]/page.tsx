// import { useTranslations } from "next-intl";
// import Box from "@/components/home/box";
import { ScrollShadow, Avatar } from "@/components/hero";
import { getUserWithBoxAndNav } from "@/services/user_page";
import Link from "next/link";
import TooltipHero from "@/components/hero/Tooltip";
import { Navbar } from "@/components/layout/home_layout";

const menuItems = [
  { label: "登录", href: "/login" },
  { label: "主页", href: "/home" },
  { label: "注册", href: "/setup" },
];
export default async function Pages({ params }: { params: any }) {
  // const t = useTranslations("HomePage");
  const { userName } = await params;
  const { data } = await getUserWithBoxAndNav(userName);
  return (
    <>
      <Navbar
        menuItems={menuItems}
        name={data.name}
        rightContent={
          <Avatar
            size="sm"
            isBordered
            color="default"
            src="https://heroui.com/images/album-cover.png"
          />
        }
      ></Navbar>
      <div
        className="bg-[#868686]
        bg-[url('/ps是c.jpeg')]
        bg-repeat bg-[50%_-500px]
        bg-fixed min-h-[100vh]
        grid grid-cols-1 gap-4 
        sm:grid-cols-1 md:grid-cols-2
        lg:grid-cols-3 2xl:grid-cols-4 
        px-2 py-4"
      >
        {/* userName: {userName} */}
        {data?.box?.map((item) => {
          return <Card key={item.title} item={item} />;
        })}
      </div>
    </>
  );
}

function Card({ item }: { item: any }) {
  return (
    <div className="text-[#f7f7f7] rounded-medium overflow-hidden bg-[#0e0e0e3d] pt-1 pb-2 h-[24vh]">
      <div className="text-center font-bold">{item.title}</div>
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
