"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { addBox } from "@/services/box";

type FieldType = {
  title?: string;
  memo?: string;
};

export default function Add() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi] = message.useMessage();

  const showModal = () => {
    form.setFieldsValue({});
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const formData = form.getFieldsValue();
    console.log(formData, "formData");
    await addBox(formData, () => {
      messageApi.open({
        type: "success",
        content: "成功",
      });
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
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
