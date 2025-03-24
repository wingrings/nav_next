// import { useTranslations } from "next-intl";
// import Box from "@/components/home/box";
import { getUserWithBoxAndNav } from "@/services/user_page";
import Link from "next/link";
import { Navbar } from "@/components/layout/home_layout";
import { getTokenMsg } from "@/services/login";
import Logout from "@/components/layout/logout";
import { ButtonNice } from "@/components/hero";
import Card from "./card";

const navItems = [
  { label: "主页", href: "/home" },
  { label: "盒子", href: "/box" },
  { label: "链接", href: "/nav" },
];

const menuItems = [
  { label: "登录", href: "/login" },
  { label: "主页", href: "/home" },
  { label: "注册", href: "/setup" },
];
export default async function Pages({ params }: { params: any }) {
  // const t = useTranslations("HomePage");
  const { userName } = await params;
  const { data } = await getUserWithBoxAndNav(userName);
  const tokenMsg = await getTokenMsg();
  return (
    <>
      <Navbar
        avatar={{ color: "danger" }}
        classNames={{
          base: "bg-[#0e0e0eaa]",
        }}
        menuItems={tokenMsg ? navItems : menuItems}
        navItems={tokenMsg ? navItems : []}
        name={data?.name}
        rightContent={
          <>
            {!tokenMsg && (
              <Link href={`/login?redirect=/${userName}`}>
                <ButtonNice variant="ghost">登 录</ButtonNice>
              </Link>
            )}
            <Logout></Logout>
          </>
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
