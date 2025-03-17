"use client";

import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { delDataBox } from "@/services/box";

interface DataType {
  title: string;
  memo: string;
  id: number;
}

const columns = [
  // { name: "序号", dataIndex: "or" },
  { name: "ID", dataIndex: "id" },
  { name: "名称", dataIndex: "title" },
  { name: "描述", dataIndex: "memo" },
  { name: "操作", dataIndex: "action" },
];
export default function TableBox({ data }: { data: DataType[] }) {
  async function delBox(id: number) {
    await delDataBox(id);
  }

  function renderCell(item: DataType, columnKey: React.Key) {
    if (columnKey === "or") {
      return <span className="text-sm text-gray-600 ml-2">{1}</span>;
    }
    if (columnKey === "action") {
      return (
        <div className="flex justify-center gap-2 w-full">
          <Button size="sm" color="primary">
            编辑
          </Button>
          <Button size="sm" color="danger" onPress={delBox.bind(null, item.id)}>
            删除
          </Button>
        </div>
      );
    }
    return item[columnKey as keyof DataType];
  }

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.dataIndex} align={"center"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
