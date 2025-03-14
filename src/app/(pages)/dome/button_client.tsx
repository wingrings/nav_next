"use client";
import { Button as ButtonAnt, message } from "antd";
import { delData } from "@/services/dome";

export function Button({ id }: { id: number }) {
  const [messageApi] = message.useMessage();

  function del(id: number) {
    delData(id).then(() => {
      messageApi.success("成功");
    });
  }

  return (
    <>
      <ButtonAnt onClick={del.bind(null, id)}>删除</ButtonAnt>
    </>
  );
}
