"use client";
import React, { useState } from "react";
import {
  Spinner,
  Form as FormHero,
  Input,
  Link,
  Select as SelectHero,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { response } from "@/tools";
import { ButtonPinkBorder, ButtonPink } from "@/components/hero";

import { editNav, addNav } from "@/services/nav";
import { useRouter } from "next/navigation";
export default function Form({
  boxId,
  data,
  list,
}: {
  boxId?: string;
  data?: {
    title: string;
    memo: string;
    link: string;
    id: string;
    sortOrder: number;
    isShow: 1 | 0;
    isCover: 1 | 0;
  };
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

  return (
    <div className="flex justify-center py-10 px-5">
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
          labelPlacement={"outside"}
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
        <SelectHero
          items={[
            { label: "是", key: 1 },
            { label: "否", key: 0 },
          ]}
          label="是否展示"
          name="isShow"
          selectionMode="single"
          labelPlacement={"outside"}
          defaultSelectedKeys={data ? [data.isShow] : []}
          placeholder="请选择"
        >
          {(animal) => {
            return <SelectItem>{animal.label}</SelectItem>;
          }}
        </SelectHero>
        <SelectHero
          items={[
            { label: "是", key: 1 },
            { label: "否", key: 0 },
          ]}
          label="是否遮盖"
          name="isCover"
          selectionMode="single"
          labelPlacement={"outside"}
          defaultSelectedKeys={data ? [data.isCover] : []}
          placeholder="请选择"
        >
          {(animal) => {
            return <SelectItem>{animal.label}</SelectItem>;
          }}
        </SelectHero>
        <Input
          errorMessage="Please enter a valid 顺序"
          label="顺序"
          labelPlacement="outside"
          defaultValue={data?.sortOrder.toString()}
          name="sortOrder"
          placeholder="输入你的顺序"
          type="number"
        />
        <Input
          isRequired
          errorMessage="Please enter a valid link"
          label="link"
          labelPlacement="outside"
          defaultValue={data?.link}
          name="link"
          placeholder="输入你的link"
          type="url"
        />

        <Textarea
          errorMessage="Please enter a valid 备注"
          defaultValue={data?.memo}
          label="备注"
          labelPlacement="outside"
          name="memo"
          placeholder="输入你的备注"
          type="text"
        />
        <div className="flex gap-5 w-full justify-center">
          <ButtonPink disabled={isPending} color="primary" type="submit">
            {isPending && <Spinner color="default" size="sm" />}提 交
          </ButtonPink>
          <Link href="/nav">
            <ButtonPinkBorder variant="flat">返回</ButtonPinkBorder>
          </Link>
        </div>
      </FormHero>
    </div>
  );
}
