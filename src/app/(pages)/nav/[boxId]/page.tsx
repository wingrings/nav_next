import React from "react";
import From from "./form";
export default async function Page({ params }: any) {
  const { boxId } = await params;
  return (
    <div>
      {boxId}
      <From boxId={boxId} />
    </div>
  );
}
