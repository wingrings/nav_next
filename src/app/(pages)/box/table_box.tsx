"use client";
import DeleteButton from "./delete_button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@heroui/react";
// import { bulkInsertBoxTitles } from "@/services/box";
import { ButtonPink } from "@/components/hero";

interface DataType {
  title: string;
  memo: string;
  id: string;
  sortOrder?: number;
  isShow: number;
  createTime: string;
  updateTime: string;
}

const columns = [
  // { name: "序号", dataIndex: "or" },
  // { name: "ID", dataIndex: "id" },
  { name: "名称", dataIndex: "title" },
  { name: "是否展示", dataIndex: "isShow" },
  { name: "顺序", dataIndex: "sortOrder" },
  { name: "描述", dataIndex: "memo" },
  { name: "更新时间", dataIndex: "updateTime" },
  { name: "创建时间", dataIndex: "createTime" },
  { name: "操作", dataIndex: "action" },
];
export default function TableBox({ data }: { data: DataType[] }) {
  function renderCell(item: DataType, columnKey: React.Key) {
    if (columnKey === "or") {
      return <span className="text-sm text-gray-600 ml-2">{1}</span>;
    }
    if (columnKey === "action") {
      return (
        <div className="flex justify-center gap-2 w-full">
          <Link href={`/box/${item.id}`}>
            <ButtonPink color="danger">编辑</ButtonPink>
          </Link>
          <DeleteButton id={item.id}></DeleteButton>
        </div>
      );
    }
    if (columnKey === "isShow") {
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
      {/* <Button onPress={bulkInsertBoxTitles}>批量添加</Button> */}
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
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
