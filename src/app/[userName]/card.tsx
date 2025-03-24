import Link from "next/link";
import TooltipHero from "@/components/hero/Tooltip";
import { ScrollShadow } from "@/components/hero";

export default function Card({ item }: { item: any }) {
  const navListCom = item.nav ? (
    <main className="grid grid-cols-3 gap-2 px-2">
      {item?.nav?.map((item: any) => {
        return <NavList key={item.title} item={item} />;
      })}
    </main>
  ) : (
    <InputCard />
  );
  return (
    <div className="text-[#f7f7f7] rounded-medium overflow-hidden bg-[#0e0e0e3d] pt-1 pb-2 h-[24vh]">
      <div className="text-center font-bold">{item.title}</div>
      <ScrollShadow className="h-[calc(100%-20px)]" size={10}>
        {navListCom}
      </ScrollShadow>
    </div>
  );
}

function InputCard() {
  return (
    <div className="cursor-not-allowed select-none opacity-30 text-sm w-full h-full flex justify-center items-center ">
      隐私导航,请先登录
    </div>
  );
}

function NavList({ item }: { item: any }) {
  const text = <span className="truncate">{item.title}</span>;
  const content = (
    // 自动换行
    <div className="max-w-[50vw]">
      {item.link && <div className="break-words text-xs">{item.title}</div>}
      <div className="break-words">{item.memo}</div>
    </div>
  );
  return item.link ? (
    <Link target="_blank" href={item.link} className="text-sm">
      <div className="h-8 flex items-center justify-center">
        {item.memo ? (
          <TooltipHero size="sm" content={content} showArrow={true}>
            <span className="truncate">{text}</span>
          </TooltipHero>
        ) : (
          text
        )}
      </div>
    </Link>
  ) : (
    <div className="cursor-not-allowed select-none h-8 flex items-center justify-center">
      {item.memo ? (
        <TooltipHero size="sm" content={content} showArrow={true}>
          <span className="truncate opacity-30">{text}</span>
        </TooltipHero>
      ) : (
        text
      )}
    </div>
  );
}
