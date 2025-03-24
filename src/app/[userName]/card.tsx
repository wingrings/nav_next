"use client";
import { useState, startTransition } from "react";
import Link from "next/link";
import { getBoxDetailsByPassword } from "@/services/box";

import TooltipHero from "@/components/hero/Tooltip";
import { ScrollShadow } from "@/components/hero";
import {
  Form,
  Input,
  addToast,
  Modal as ModalHero,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
export default function Card({ item }: { item: any }) {
  const [cardData, setCardData] = useState(item);
  function callBack(data: string) {
    setCardData(data);
  }

  const navListCom = cardData.nav ? (
    <main className="grid grid-cols-3 gap-2 px-2">
      {cardData?.nav?.map((item: any) => {
        return <NavList key={item.title} item={item} />;
      })}
    </main>
  ) : (
    <InputCard callBack={callBack} item={item} />
  );
  return (
    <div className="text-[#f7f7f7] rounded-medium overflow-hidden bg-[#0e0e0e3d] pt-1 pb-2 h-[24vh]">
      <div className="text-center font-bold">
        <Modal callBack={callBack} data={cardData}>
          {cardData.title}
        </Modal>
      </div>
      <ScrollShadow className="h-[calc(100%-20px)]" size={10}>
        {navListCom}
      </ScrollShadow>
    </div>
  );
}

function Modal({
  callBack,
  children,
  data,
}: {
  callBack: (data: string) => void;
  children: React.ReactNode;
  data: Record<string, any>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function callBackHandle(data: string) {
    callBack(data);
    onClose();
  }
  function openHandle() {
    if (!data.havePassword) return;
    onOpen();
  }
  return (
    <>
      <div className="cursor-pointer" onClick={openHandle}>
        {children}
      </div>
      <ModalHero isOpen={isOpen} size="sm" onClose={onClose}>
        <ModalContent>
          {
            <>
              <ModalHeader className="flex flex-col gap-1">
                {children}
              </ModalHeader>
              <ModalBody>
                <div className="mb-10">
                  <BoxForm callBack={callBackHandle} item={data} />
                </div>
              </ModalBody>
            </>
          }
        </ModalContent>
      </ModalHero>
    </>
  );
}

function InputCard({ callBack, item }: any) {
  return (
    <div className="h-full w-full gap-3 flex flex-col text-sm justify-center items-center">
      <BoxForm callBack={callBack} item={item} />
      <div className="cursor-not-allowed select-none opacity-30 text-sm w-full text-center">
        隐私导航,请登录 {item.havePassword && ",或输入盒子密码"}
      </div>
    </div>
  );
}

function BoxForm({ callBack, item }: { callBack: any; item: any }) {
  const [password, setPassword] = useState("");
  function handleInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", password);
    formData.append("id", item.id);
    startTransition(() => {
      getBoxDetailsByPassword(formData).then((res: any) => {
        if (res?.success) {
          callBack(res.data);
        } else {
          addToast({
            description: res.message,
            color: "danger",
          });
        }
      });
    });
  }
  return (
    <>
      {item.havePassword && (
        <Form className="w-full" onSubmit={handleInput}>
          <div className=" opacity-50 px-5 w-full flex justify-around gap-3">
            <Input
              classNames={{
                inputWrapper: "bg-[#0e0e0e3d]",
              }}
              placeholder="请输入该盒子密码"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="whitespace-nowrap" type="submit">
              提交
            </button>
          </div>
        </Form>
      )}
    </>
  );
}

function NavList({ item }: { item: any }) {
  const text = <span className="truncate">{item.title}</span>;
  const content = (
    // 自动换行
    <div className="max-w-[50vw]">
      {item.link && <div className="break-words text-xs">{item.title}</div>}
      <div className="break-words">{item.memo}</div>
    </div>
  );
  return item.link ? (
    <Link target="_blank" href={item.link} className="text-sm">
      <div className="h-8 flex items-center justify-center">
        {item.memo ? (
          <TooltipHero size="sm" content={content} showArrow={true}>
            <span className="truncate">{text}</span>
          </TooltipHero>
        ) : (
          text
        )}
      </div>
    </Link>
  ) : (
    <div className="cursor-not-allowed select-none h-8 flex items-center justify-center">
      {item.memo ? (
        <TooltipHero size="sm" content={content} showArrow={true}>
          <span className="truncate opacity-30">{text}</span>
        </TooltipHero>
      ) : (
        text
      )}
    </div>
  );
}
