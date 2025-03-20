"use client";
import React from "react";
import { Form, Input, Button } from "@heroui/react";
import { setup } from "@/services/login";
// import { bulkInsertUserTitles } from "@/services/login";
export default function Page() {
  return (
    <div className="flex justify-center py-10">
      <Form className="w-full max-w-md flex flex-col gap-4" action={setup}>
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
        <div className="flex gap-2 w-full">
          <Button className="w-full" color="primary" type="submit">
            注册
          </Button>
        </div>
      </Form>
      {/* <Button className="w-full" color="primary" onPress={bulkInsertUserTitles}>
        同步
      </Button> */}
    </div>
  );
}
