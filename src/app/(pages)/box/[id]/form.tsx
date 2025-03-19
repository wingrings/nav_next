"use client";
import React, { useEffect } from "react";
import { Form as FormHero, Input, Button, Link, Spinner } from "@heroui/react";
import { useActionState, startTransition } from "react";
import { editBox } from "@/services/box";
import { response } from "@/tools";
import { useRouter } from "next/navigation";
export default function Form({
  data,
}: {
  data: { title: string; memo: string; id: string };
}) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(editBox, null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("id", data.id);
    startTransition(async () => {
      action(formData);
    });
  };
  useEffect(() => {
    if (state) {
      const { success } = response(state);
      if (success) {
        router.push("/box");
      }
    }
  }, [state, router]);

  return (
    <div className="flex justify-center py-10">
      <FormHero
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={onSubmit}
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
          <Button disabled={isPending} color="primary" type="submit">
            {isPending && <Spinner color="default" size="sm" />}
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
