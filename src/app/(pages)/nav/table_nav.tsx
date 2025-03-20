"use client";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
  addToast,
} from "@heroui/react";
import { delNavData } from "@/services/nav";
import { useBearStore } from "@/store/nav";
import { useState, useEffect } from "react";
import { getNavList } from "@/services/nav";
// import { bulkInsertNavTitles } from "@/services/nav";
interface DataType {
  title: string;
  memo: string;
  id: string;
  boxId: string;
}

const columns = [
  // { name: "序号", dataIndex: "or" },
  { name: "名称", dataIndex: "title" },
  { name: "描述", dataIndex: "memo" },
  { name: "连接", dataIndex: "link" },
  { name: "盒子", dataIndex: "boxName" },
  { name: "更新时间", dataIndex: "updateTime" },
  { name: "创建时间", dataIndex: "createTime" },
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
            <Button size="sm" color="primary">
              编辑
            </Button>
          </Link>
          <Button size="sm" color="danger" onPress={delBox.bind(null, item.id)}>
            删除
          </Button>
        </div>
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
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
