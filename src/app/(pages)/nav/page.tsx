import React from "react";
import TableNav from "./table_nav";
import { getBoxList } from "@/services/box";
import Select from "./select";
export default async function Page() {
  const animals = await getBoxList();
  return (
    <div className="p-5">
      <div className="flex w-full justify-between mb-3">
        <Select animals={animals || []} />
      </div>

      <TableNav />
    </div>
  );
}
