// import { useTranslations } from "next-intl";
import "@/db";
function Card() {
  return <div className="border rounded h-[30vh] bg-[#0e0e0e3d]">01</div>;
}

export default function Pages() {
  // const t = useTranslations("HomePage");
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
