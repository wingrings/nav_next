"use client";
import React, { useState } from "react";
import {
  Spinner,
  Form as FormHero,
  Input,
  Button,
  Link,
  Select as SelectHero,
  SelectItem,
} from "@heroui/react";
import { response } from "@/tools";

import { editNav, addNav } from "@/services/nav";
import { useRouter } from "next/navigation";
export default function Form({
  boxId,
  data,
  list,
}: {
  boxId?: string;
  data?: { title: string; memo: string; link: string; id: string };
  list: any[];
}) {
  const [isPending, setIsPending] = useState<boolean>(false);

  const router = useRouter();
  const action = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    if (isPending) return;
    setIsPending(true);
    const result = response(
      await (!data?.id ? addNav(formData) : editNav(data.id, formData))
    );
    if (result?.success) {
      router.back();
      setIsPending(false);
    }
  };

  console.log(router, "router");
  return (
    <div className="flex justify-center py-10">
      <FormHero
        onSubmit={action}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <SelectHero
          isRequired
          items={list}
          label="盒子"
          name="boxId"
          selectionMode="single"
          defaultSelectedKeys={boxId ? [boxId] : []}
          placeholder="请选择盒子"
        >
          {(animal) => <SelectItem key={animal.id}>{animal.title}</SelectItem>}
        </SelectHero>
        <Input
          isRequired
          errorMessage="Please enter a valid 名称"
          label="名称"
          labelPlacement="outside"
          defaultValue={data?.title}
          name="title"
          placeholder="输入你的名称"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid link"
          label="link"
          labelPlacement="outside"
          defaultValue={data?.title}
          name="link"
          placeholder="输入你的link"
          type="text"
        />

        <Input
          errorMessage="Please enter a valid 备注"
          defaultValue={data?.memo}
          label="备注"
          labelPlacement="outside"
          name="memo"
          placeholder="输入你的备注"
          type="text"
        />
        <div className="flex gap-2">
          <Button disabled={isPending} color="primary" type="submit">
            {isPending && <Spinner color="default" size="sm" />}
            提交
          </Button>
          <Link href="/nav">
            <Button variant="flat">返回</Button>
          </Link>
        </div>
      </FormHero>
    </div>
  );
}
