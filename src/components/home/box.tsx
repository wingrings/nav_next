import React from "react";

import Link from "next/link";

import { Tooltip } from "antd";

export default function Box({ data }: { data: any }) {
  return (
    <div className="rounded h-full bg-[#0e0e0e3d]">
      <header className="text-center text-white mb-3">{data.title}</header>
      <main className="grid grid-cols-3 gap-4 px-2">
        {data.list.map((item: any, index: any) => {
          return <BoxList key={index} {...item} />;
        })}
      </main>
    </div>
  );
}

function BoxList({ title, link, introduction }: any) {
  return (
    <Link
      target="_blank"
      href={link}
      className="text-white flex justify-center items-center"
    >
      <Tooltip title={introduction ?? ""}>
        <span>{title}</span>
      </Tooltip>
    </Link>
  );
}
