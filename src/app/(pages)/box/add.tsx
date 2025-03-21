"use client";
import React, { useState } from "react";
// import { addBox } from "@/services/box";
// import { useRouter } from "next/navigation";
// import { response } from "@/tools";
import { ButtonNice } from "@/components/hero";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  // ModalFooter,
  // useDisclosure,
} from "@heroui/react";

import Form from "./[id]/form";
// type FieldType = {
//   title?: string;
//   memo?: string;
// };

export default function Add() {
  // const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // const handleOk = async () => {
  //   const formData = form.getFieldsValue();
  //   const res = response(await addBox(formData));
  //   setIsModalOpen(false);
  //   if (!res.success) return;
  //   router.push("/box");
  // };

  return (
    <div>
      <ButtonNice onPress={showModal}>添 加</ButtonNice>
      <Modal
        isOpen={isModalOpen}
        size={"md"}
        onClose={setIsModalOpen.bind(null, false)}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                新增盒子
              </ModalHeader>
              <ModalBody>
                <Form cancel={setIsModalOpen.bind(null, false)} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
