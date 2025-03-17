"use client";
import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import { addToast, ToastProvider, Button } from "@heroui/react";
import { addBox } from "@/services/box";
import { useRouter } from "next/navigation";

type FieldType = {
  title?: string;
  memo?: string;
};

export default function Add() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({});
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const formData = form.getFieldsValue();
    console.log(formData, "formData");
    await addBox(formData);
    addToast({
      description: "成功添加",
      color: "success",
    });

    setIsModalOpen(false);
    router.push("/box");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ToastProvider placement="top-center" toastOffset={60} />
      <Button color="primary" onPress={showModal}>
        添加
      </Button>
      <Modal
        title="添加盒子"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="名称"
            name="title"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="描述"
            name="memo"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}
