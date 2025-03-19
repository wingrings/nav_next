"use client";
import React, { useEffect, useState } from "react";
import {
  Form as FormHero,
  Input,
  Button,
  Link,
  addToast,
  Select as SelectHero,
  SelectItem,
} from "@heroui/react";
import { getBoxList } from "@/services/box";

import { editNav, addNav } from "@/services/nav";
import { useRouter } from "next/navigation";
export default function Form({
  boxId,
  data,
}: {
  boxId: string;
  data?: { title: string; memo: string; link: string; id: string };
}) {
  const [animals, setAnimals] = useState<any[]>([]);

  useEffect(() => {
    getBoxList().then((res) => {
      setAnimals(res || []);
    });
  }, []);
  const router = useRouter();
  let action = async (formData: FormData) => {
    const result = await addNav(formData);
    if (result?.success) {
      // 页面回退
      router.back();
    } else {
      addToast({
        description: result.message,
        color: "danger",
      });
    }
  };
  if (data?.id) {
    action = async (formData: FormData) => {
      const result = await editNav(data.id, formData);
      if (result?.success) {
        // handle success
      }
    };
  }
  return (
    <div className="flex justify-center py-10">
      <FormHero action={action} className="w-full max-w-md flex flex-col gap-4">
        <SelectHero
          isRequired
          items={animals}
          label="盒子"
          selectionMode="single"
          selectedKeys={[boxId || ""]}
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
          <Button color="primary" type="submit">
            提交
          </Button>
          <Link href="/box">
            <Button variant="flat" onPress={router.back.bind(null)}>
              返回
            </Button>
          </Link>
        </div>
      </FormHero>
    </div>
  );
}
