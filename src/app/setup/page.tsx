"use client";
import { response } from "@/tools";
import React, { useEffect, startTransition, useActionState } from "react";
import { Form, Input, Spinner } from "@heroui/react";
import { setup } from "@/services/login";
import { ButtonNice, Link, ButtonPink } from "@/components/hero";
import BackButton from "@/components/back_button";
// import { bulkInsertUserTitles } from "@/services/login";
export default function Page() {
  const [state, action, isPending] = useActionState(setup, false);
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
    <div className="flex h-[90vh] items-center justify-center py-10 px-5">
      <Form className="w-full max-w-md flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          isRequired
          errorMessage="Please enter a valid name"
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
            size="lg"
            className="w-full"
            color="primary"
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
            注 &nbsp; 册
          </ButtonNice>
        </div>
        <footer className="flex w-full gap-5">
          <Link href="/login" className="w-full">
            <ButtonPink size="lg" className="w-full">
              去登录
            </ButtonPink>
          </Link>
          <BackButton size="lg" className="w-full" />
        </footer>
      </Form>
      {/* <Button className="w-full" color="primary" onPress={bulkInsertUserTitles}>
        同步
      </Button> */}
    </div>
  );
}
