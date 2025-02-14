"use client";
import { useState, useEffect } from "react";
import { pushData, getTestData } from "@/services/locale";
import clsx from "clsx";
export default function Test({ children }: any) {
  const [data, setData] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>("");
  useEffect(() => {
    setInterval(() => {
      console.log("test");
      getData();
    }, 3000);
  }, []);

  function getData() {
    getTestData().then((res) => {
      console.log(res);
      setData(res.data);
    });
  }
  function submit() {
    pushData(inputValue).then(() => {
      getData();
    });
    setInputValue("");
  }
  return (
    <div>
      {children}
      {/* 分割线 */}
      <hr />
      <h4>test</h4>
      {data.map((item: any, index: number) => {
        return <div key={index}>{item}</div>;
      })}
      <input
        type="text"
        value={inputValue}
        style={{ border: "1px solid red" }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={clsx("p-1", "bg-slate-200")} onClick={submit}>
        发送
      </button>
      <hr />
    </div>
  );
}
