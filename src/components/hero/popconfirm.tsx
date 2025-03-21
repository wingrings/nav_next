import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
export default function PopConfirm({
  children,
  describe,
  onConfirm,
  onCancel,
}: {
  children: React.ReactNode;
  describe?: string | React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      showArrow
      placement="right"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-4">
          <div className="py-2 max-w-[50vw] min-w-52 text-center text-pink-400">
            {describe ? describe : "确定删除吗? 删除后将无法恢复！"}
          </div>
          <footer className="flex justify-center items-center gap-2">
            {
              <Button
                size="sm"
                color="danger"
                onPress={onCancel ? onCancel : setIsOpen.bind(null, false)}
              >
                取消
              </Button>
            }
            {onConfirm && (
              <Button
                variant="ghost"
                size="sm"
                onPress={onConfirm}
                color="default"
              >
                确定
              </Button>
            )}
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}
