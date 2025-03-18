"use server"
import { db } from "@/db";
import {resDataHandle} from '@/services/common'
import dayjs from "dayjs";
import { redirect } from "next/navigation";


 // 获取数据
export async function getBoxList() {
  const posts = await db.box.findMany();
  return posts.map(post => ({
    ...post,
    createTime: dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss'),
    updateTime: dayjs(post.updateTime).format('YYYY-MM-DD HH:mm:ss'),
  }));
}


// 添加
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

// 删除
export async function delBoxData(id: number): Promise<any> {
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
// 获取详情
export async function getBoxDetails(id: number): Promise<any> {
  try {
    const box = await db.box.findUnique({
      where: {id}
    })
    return resDataHandle(200 ,{data: box})
  } catch (error) {
    return resDataHandle(500, {message: error})
  }
}
// 编辑
export async function editBox(id: number, formData: FormData): Promise<any> {
  console.log(id, formData.get('title'), 'id, formData');
  await db.box.update({
    where: {id},
    data: {title: formData.get('title') as string, memo: formData.get('memo') as string}
  })
  redirect('/box')
}