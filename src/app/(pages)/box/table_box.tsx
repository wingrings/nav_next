"use client";

import { Space, Table, Button } from "antd";
import type { TableProps } from "antd";

interface DataType {
  title: string;
  memo: string;
  id?: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "序号",
    dataIndex: "or",
    key: "or",
    render: (_text, _data, index) => {
      return <a>{index}</a>;
    },
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "名称",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "描述",
    dataIndex: "memo",
    key: "memo",
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button type="primary">编辑</Button>
        <Button danger>删除</Button>
      </Space>
    ),
  },
];
export default function TableBox({ data }: { data: DataType[] }) {
  return <Table<DataType> columns={columns} dataSource={data} />;
}
