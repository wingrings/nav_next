import React from "react";

import TableBox from "./table_box";
import Add from "./add";
import { getBoxList } from "@/services/box";

export default async function Page() {
  const data = await getBoxList();
  return (
    <div className="p-10">
      <header className="flex justify-end">
        <Add />
      </header>
      <main className="mt-4">
        <TableBox data={data} />
      </main>
    </div>
  );
}
