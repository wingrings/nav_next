"use client";
// import { Textarea, Form, ScrollShadow, Avatar } from "@heroui/react";
// import { ButtonNice } from "@/components/hero";
// import React, { useState, useEffect, useRef } from "react";

export default function Client() {
  // const [messages, setMessages] = useState<string[]>([]);
  // const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  // 连接 SSE
  // const eventSource = new EventSource("/api/chat");

  // eventSource.onmessage = (e) => {
  //   setMessages((prev) => [...prev, JSON.parse(e.data)]);
  // };

  // return () => eventSource.close();
  // }, []);

  // const sendMessage = async (value: string) => {
  //   try {
  //     await fetch("/api/send", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ message: value }),
  //     });
  //     handleReset();
  //   } catch (error) {
  //     console.error("发送失败:", error);
  //   }
  // };

  // function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const value = new FormData(e.currentTarget).get("value") as string;
  //   sendMessage(value);
  // }
  // const handleReset = () => {
  //   if (formRef.current) {
  //     formRef.current.reset(); // 重置表单
  //   }
  // };

  return (
    <div className="bg-white rounded-3xl p-10 w-full mr-10">
      <div className="pb-5">
        {/* <ScrollShadow className="h-[50vh]"> */}
        {/* <div className="flex flex-col gap-5">
            {messages.map((item, index) => {
              return (
                <div key={index} className="pl-2 flex items-center gap-4">
                  <div>
                    <Avatar
                      size="sm"
                      isBordered
                      color="danger"
                      src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                    />
                  </div>
                  <div className="opacity-70 bg-[#0077ff] rounded-3xl text-white py-2 px-5">
                    <div className="break-all w-full">{item}</div>
                  </div>
                </div>
              );
            })}
          </div> */}
        {/* </ScrollShadow> */}
      </div>

      {/* <Form ref={formRef} onSubmit={onSubmit}>
        <Textarea
          labelPlacement="outside"
          placeholder="Enter your description"
          variant="bordered"
          name="value"
        />
        <ButtonNice className="w-full" size="lg" type="submit">
          发 送
        </ButtonNice>
      </Form> */}
    </div>
  );
}
