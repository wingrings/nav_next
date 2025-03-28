"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  addToast,
} from "@heroui/react";
import {
  ButtonPink,
  ButtonPinkBorder,
  //  PopConfirm
} from "@/components/hero";
import { delNavData } from "@/services/nav";
import { useBearStore } from "@/store/nav";
import { useState, useEffect } from "react";
import { getNavList } from "@/services/nav";
import clsx from "clsx";
// import { bulkInsertNavTitles } from "@/services/nav";
interface DataType {
  title: string;
  memo: string;
  id: string;
  boxId: string;
  isShow: number;
  isCover: number;
}

const columns = [
  // { name: "序号", dataIndex: "or" },
  { name: "名称", dataIndex: "title" },
  { name: "链接", dataIndex: "link" },
  { name: "顺序", dataIndex: "sortOrder" },
  { name: "是否展示", dataIndex: "isShow" },
  { name: "是否遮盖", dataIndex: "isCover" },
  { name: "盒子", dataIndex: "boxName" },
  { name: "描述", dataIndex: "memo" },
  // { name: "更新时间", dataIndex: "updateTime" },
  // { name: "创建时间", dataIndex: "createTime" },
  { name: "操作", dataIndex: "action" },
];
export default function TableBox() {
  const boxId = useBearStore((state) => state.boxId);
  const [data, setData] = useState<DataType[]>([]);

  function getNavListHandel(boxId: string) {
    getNavList(boxId).then((res) => {
      setData(res || []);
    });
  }
  useEffect(() => {
    getNavListHandel(boxId);
  }, [boxId]);

  async function delBox(id: string) {
    const res = await delNavData(id);
    if (!res.success) {
      addToast({
        description: res.message,
        color: "danger",
      });
      return;
    }
    addToast({
      description: "删除成功",
      color: "success",
    });
    getNavListHandel(boxId);
  }

  function renderCell(item: DataType, columnKey: React.Key) {
    if (columnKey === "or") {
      return <span className="text-sm text-gray-600 ml-2">{1}</span>;
    }
    if (columnKey === "action") {
      return (
        <div className="flex justify-center gap-2 w-full">
          <Link href={`/nav/${item.id}`}>
            <ButtonPink>编 辑</ButtonPink>
          </Link>
          {/* <PopConfirm onConfirm={delBox.bind(null, item.id)}>
            <ButtonPinkBorder>删 除</ButtonPinkBorder>
          </PopConfirm> */}
          <ButtonPinkBorder onPress={delBox.bind(null, item.id)}>
            删 除
          </ButtonPinkBorder>
        </div>
      );
    }
    if (columnKey === "isShow" || columnKey === "isCover") {
      return (
        <span className="text-sm text-gray-600 ml-2">
          {item[columnKey] ? "是" : "否"}
        </span>
      );
    }
    return item[columnKey as keyof DataType];
  }

  return (
    <>
      {/* {boxId} */}
      {/* <Button onPress={bulkInsertNavTitles.bind(null, boxId)}>批量添加</Button> */}
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.dataIndex} align={"center"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"暂无数据"} items={data}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  <div className={clsx("break-words", "max-w-[25vw]")}>
                    {renderCell(item, columnKey)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
