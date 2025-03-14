import React from "react";
import { Button } from "./button_client";
import { getData, add } from "@/services/dome";

export default async function Pages() {
  const posts = await getData();
  console.log(posts, "posts??????");

  return (
    <div className="px-10 container">
      <form action={add}>
        <h3 className="font-bold">create a snippet</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="w-9 inline-block" htmlFor="title">
              Title
            </label>
            <input name="title" className="border" type="text" id="title" />
          </div>
          <div>
            <label className="w-9 inline-block" htmlFor="code">
              Code
            </label>
            <input className="border" name="code" type="text" id="code" />
          </div>
          <div>
            <button className="border rounded px-5 py-2" type="submit">
              提交
            </button>
          </div>
        </div>
      </form>

      <List list={posts}></List>
    </div>
  );
}

function List({ list }: { list: any[] }) {
  return (
    <>
      {list.map((item) => (
        <div key={item.id} className="flex gap-6">
          <span className="font-semibold">{item.id}</span>
          <span className="font-semibold">{item.title}</span>
          <span className="text-sm text-gray-600 ml-2">by {item.code}</span>
          <Button id={item.id}></Button>
        </div>
      ))}
    </>
  );
}
