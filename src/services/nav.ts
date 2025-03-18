"use server"
import { db } from "@/db";
import {resDataHandle} from '@/services/common'
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import {verifyToken} from '@/tools/token'
import { getBoxList } from './box'


 // 获取数据
export async function getNavList(boxId: string) {
  const res = await verifyToken()
  if(!res) return
  const userId = res.id
  // 用户id获取列表
  const whereData = boxId ? {userId,boxId} : {userId}
  const posts = await db.nav.findMany({where: whereData});
  const boxList = await getBoxList()
  return posts.map(post => ({
    ...post,
    boxName: boxList?.find(item => item.id === post.boxId)?.title,
    createTime: dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss'),
    updateTime: dayjs(post.updateTime).format('YYYY-MM-DD HH:mm:ss'),
  }));
}


// 添加
export async function addNav(formData: FormData) {
  const res = await verifyToken()
  if(!res) return resDataHandle(500, 'token过期')
  const title = formData.get('title') as string
  const boxId = formData.get('boxId') as string
  // 先查找一下这个title是否存在
  const nav = await db.nav.findFirst({
    where: {title, userId: res.id, boxId}
  })
  if(nav) return resDataHandle(500, 'title已存在')

  const newNav = await db.nav.create({
    data: {
      title: title,
      memo: formData.get('memo') as string,
      userId: res.id,
      link: formData.get('link') as string,
      boxId
    },
  });
  return resDataHandle(200 ,{data: newNav})
}

// 删除
export async function delNavData(id: string): Promise<any> {
  try {
    // 先查询一下这个id是否存在
    const nav = await db.nav.findUnique({
      where: {id}
    })
    if(!nav) return resDataHandle(500, 'id不存在')
  
    const newNav = await db.nav.delete({
      where: {id}
    })
    return resDataHandle(200,{data: newNav})
  } catch (error) {
    return resDataHandle(500, {message: error})
  }
}
// 获取详情
export async function getNavDetails(id: string): Promise<any> {
  try {
    const nav = await db.nav.findUnique({
      where: {id}
    })
    return resDataHandle(200 ,{data: nav})
  } catch (error) {
    return resDataHandle(500, {message: error})
  }
}
// 编辑
export async function editNav(id: string, formData: FormData): Promise<any> {
  const res = await verifyToken()
  if(!res) return
  await db.nav.update({
    where: {id},
    data: {
      title: formData.get('title') as string,
      memo: formData.get('memo') as string,
      userId: res.id
    }
  })
  redirect('/nav')
}