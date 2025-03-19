import React from "react";
import From from "../../form";
import { getBoxList } from "@/services/box";

export default async function Page({ params }: { params: any }) {
  const list = await getBoxList();
  const boxId = await params.boxId;
  return (
    <div>
      <From boxId={boxId} list={list || []} />
    </div>
  );
}
