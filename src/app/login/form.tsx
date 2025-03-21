"use client";
import { loginHandle } from "@/services/login";
import { response } from "@/tools";
import React, { useEffect, startTransition, useActionState } from "react";
import { Form as FormHero, Input, Spinner } from "@heroui/react";
import { ButtonNice, ButtonPink, Link } from "@/components/hero";
import BackButton from "@/components/back_button";
export default function Form() {
  const [state, action, isPending] = useActionState(loginHandle, false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    if (isPending) return;
    startTransition(async () => {
      action(formData);
    });
  };

  useEffect(() => {
    if (state) {
      response(state);
    }
  }, [state]);
  return (
    <FormHero
      className="w-full max-w-md flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid 账号"
        label="账号"
        labelPlacement="outside"
        name="name"
        placeholder="请输入你的账号"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="密码"
        labelPlacement="outside"
        name="password"
        placeholder="请输入你的密码"
        type="password"
      />
      <div className="flex flex-col gap-2 w-full">
        <ButtonNice
          disable={isPending}
          size="lg"
          className="w-full text-white"
          type="submit"
        >
          {isPending && (
            <Spinner
              size="sm"
              classNames={{
                spinnerBars: "text-white bg-white",
              }}
              variant="spinner"
            />
          )}
          登 &nbsp; 录
        </ButtonNice>
      </div>
      <footer className="flex w-full gap-5">
        <Link href="/setup" className="w-full">
          <ButtonPink size="lg" className="w-full">
            去注册
          </ButtonPink>
        </Link>
        <BackButton size="lg" className="w-full" />
      </footer>
    </FormHero>
  );
}
