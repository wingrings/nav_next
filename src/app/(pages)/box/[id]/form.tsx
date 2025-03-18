"use client";
import React from "react";
import { Form as FormHero, Input, Button, Link } from "@heroui/react";
import { editBox } from "@/services/box";
export default function Form({
  data,
}: {
  data: { title: string; memo: string; id: string };
}) {
  const editBoxWithId = editBox.bind(null, data.id);
  return (
    <div className="flex justify-center py-10">
      <FormHero
        action={editBoxWithId}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <Input
          isRequired
          errorMessage="Please enter a valid 名称"
          label="名称"
          labelPlacement="outside"
          defaultValue={data.title}
          name="title"
          placeholder="输入你的名称"
          type="text"
        />

        <Input
          errorMessage="Please enter a valid 备注"
          defaultValue={data.memo}
          label="备注"
          labelPlacement="outside"
          name="memo"
          placeholder="输入你的备注"
          type="text"
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            提交
          </Button>
          <Link href="/box">
            <Button variant="flat">返回</Button>
          </Link>
        </div>
      </FormHero>
    </div>
  );
}
