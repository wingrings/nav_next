"use client";
import React, { useEffect } from "react";
import {
  Form as FormHero,
  Input,
  Link,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useActionState, startTransition } from "react";
import { editBox, addBox } from "@/services/box";
import { response } from "@/tools";
import { useRouter } from "next/navigation";
import { ButtonPink, ButtonPinkBorder } from "@/components/hero";
export default function Form({
  cancel,
  data,
}: {
  data?: { title?: string; memo?: string; id?: string; sortOrder?: number };
  cancel?: () => void;
}) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    data?.id ? editBox : addBox,
    null
  );
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (data?.id) formData.append("id", data.id);
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
      cancel?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, router]);

  return (
    <div className="flex justify-center">
      <FormHero
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={onSubmit}
      >
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
          errorMessage="Please enter a valid 顺序"
          label="顺序"
          labelPlacement="outside"
          defaultValue={data?.sortOrder?.toString()}
          name="title"
          placeholder="输入你的顺序"
          type="number"
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
        <div className="flex gap-5 justify-center w-full">
          <ButtonPink disabled={isPending} color="primary" type="submit">
            {isPending && <Spinner color="default" size="sm" />}提 交
          </ButtonPink>
          {data?.id ? (
            <Link href="/box">
              <ButtonPinkBorder variant="flat">取 消</ButtonPinkBorder>
            </Link>
          ) : (
            <ButtonPinkBorder onPress={cancel} variant="flat">
              取 消
            </ButtonPinkBorder>
          )}
        </div>
      </FormHero>
    </div>
  );
}
