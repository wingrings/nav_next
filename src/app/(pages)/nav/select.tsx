"use client";
import React from "react";
import { Select as SelectHero, SelectItem } from "@heroui/react";
import Button from "@/components/hero/button";
import { useRouter } from "next/navigation";
// import { addToast } from "@heroui/react";
import { useBearStore } from "@/store/nav";
export default function Select({
  animals,
  boxIdProp,
}: {
  boxIdProp?: string;
  animals: { title: string; id: string; [key: string]: any }[];
}) {
  // const { setBoxId, boxId } = useBearStore();
  const boxId = useBearStore((state) => {
    return state.boxId;
  });
  const setBoxId = useBearStore((state) => state.setBoxId);

  if (boxIdProp) setBoxId(boxIdProp);
  // const [boxId, setBoxId] = useState(boxIdProp);
  const router = useRouter();
  function add() {
    // if (!boxId) {
    //   addToast({
    //     description: "请选择盒子",
    //     color: "danger",
    //   });
    //   return;
    // }
    router.push(`/nav/box/${boxId}`);
  }
  return (
    <div className="flex w-full justify-between">
      <SelectHero
        className="w-[500px]"
        items={animals}
        label="盒子"
        selectionMode="single"
        selectedKeys={[boxId || ""]}
        placeholder="请选择盒子"
        onChange={(e) => {
          setBoxId(e.target.value);
        }}
      >
        {(animal) => <SelectItem key={animal.id}>{animal.title}</SelectItem>}
      </SelectHero>
      <Button onPress={add}>添加</Button>
    </div>
  );
}
