import React from "react";
import Form from "../form";
import { getNavDetails } from "@/services/nav";
import { getBoxList } from "@/services/box";

export default async function page({ params }: { params: any }) {
  const urlParams = await params;
  const navId = urlParams.navId;
  const navDetailsData = await getNavDetails(navId);
  const list = await getBoxList();
  return (
    <div>
      <Form
        boxId={navDetailsData.data.boxId}
        data={navDetailsData.data}
        list={list || []}
      />
    </div>
  );
}
