"use server"
import { db } from "@/db";
import {resDataHandle, errorHandler} from '@/services/common'
import dayjs from "dayjs";
// import { redirect } from "next/navigation";
import {verifyToken} from '@/tools/token'
// import boxData from '../../data/Box.json'

 // 获取数据
export async function getBoxList() {
  const res = await verifyToken()
  if(!res) return
  const userId = res.id
  // 用户id获取列表
  const posts = await db.box.findMany({where: {userId}});

  return posts.map(post => ({
    ...post,
    createTime: dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss'),
    updateTime: dayjs(post.updateTime).format('YYYY-MM-DD HH:mm:ss'),
  }));
}


// 添加
export async function addBox(formData: {title: string; memo: string}) {
  try {
    const res = await verifyToken()
    if(!res) return
    const newBox = await db.box.create({
      data: {
        title: formData.title,
        memo: formData.memo,
        userId: res.id
      },
    });
    return resDataHandle(200 ,{data: newBox, message: '添加成功'})
  } catch (error) {
    return errorHandler(error, {text: '标题'})
  }
}

// 删除
export async function delBoxData(id: string): Promise<any> {
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
export async function getBoxDetails(id: string): Promise<any> {
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
export async function editBox(_prevState: any, formData: FormData): Promise<any> {
  const res = await verifyToken()
  const id = formData.get('id') as string
  try {
    const newBox = await db.box.update({
      where: {id},
      data: {
        title: formData.get('title') as string,
        memo: formData.get('memo') as string,
        userId: res.id
      }
    })
    return resDataHandle(200 ,{data: newBox, message: '修改成功'})
  } catch(error) {
    return errorHandler(error, {text: '标题'})
  }
}




export async function bulkInsertBoxTitles( ) {
  const titles: any[] = []
  try {
    const data = titles.map((item) => ({
      ...item,
      createTime: new Date(),
      updateTime: new Date(),
    }));
    console.log(data, 'data');
    const result = await db.box.createMany({
      data,
      skipDuplicates: true,
    });

    console.log(`成功插入 ${result.count} 条数据`);
    return result;
  } catch (error) {
    console.error('批量插入失败:', JSON.stringify(error));
    throw error;
  }
}
