"use server"
import { db } from "@/db";
import {resDataHandle} from '@/services/common'
import dayjs from "dayjs";

export async function getBoxList() {
  const posts = await db.box.findMany();
  return posts.map(post => ({
    ...post,
    createTime: dayjs(post.createTime).format('YYYY-MM-DD'),
    updateTime: dayjs(post.updateTime).format('YYYY-MM-DD')
  }));
}



export async function addBox(formData: {title: string; memo: string}) {
  try {
    // 先查找一下这个title是否存在
    // const box = await db.box.findUnique({
    //   where: {title: formData.title}
    // })
    // console.log(box, 'box');
    // if(box) return resDataHandle(500, 'title已存在')
    const newBox = await db.box.create({
      data: {
        title: formData.title,
        memo: formData.memo,
      },
    });
    return resDataHandle(200 ,{data: newBox})
  } catch (error) {
    return resDataHandle(500 ,{message: error})
  }
}
export async function delDataBox(id: number): Promise<any> {
  try {
    // 先查询一下这个id是否存在
    const box = await db.box.findUnique({
      where: {id}
    })
    if(!box) return resDataHandle(500, 'id不存在')
  
    const newBox = await db.box.delete({
      where: {id}
    })
    return resDataHandle(200,{data: newBox})
  } catch (error) {
    return resDataHandle(500, {message: error})
  }
}