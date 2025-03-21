"use server"
import { db } from "@/db";
import {resDataHandle, errorHandler} from '@/services/common'
import dayjs from "dayjs";
// import { redirect } from "next/navigation";
import {verifyToken} from '@/tools/token'
import { getBoxList } from './box'



// import navData from '../../data/Nav.json'



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
  const title = formData.get('title') as string;
  const link = formData.get('link') as string;
  const memo = formData.get('memo') as string;
  const boxId = formData.get('boxId') as string;
  const sortOrder = formData.get('sortOrder') as string;

  if(!boxId) return resDataHandle(400, 'boxId 未传')
  if(!title) return resDataHandle(400, 'title 未传')
  if(!link) return resDataHandle(400, 'link 未传')

  try {
    const res = await verifyToken()
    if(!res) return
    const newBox = await db.nav.create({
      data: {
        title: title,
        memo: memo,
        link: link,
        userId: res.id,
        boxId,
        sortOrder: Number(sortOrder),
      },
    });
    return resDataHandle(200 ,{data: newBox, message: '添加成功'})
  } catch (error) {
    return errorHandler(error, {text: '链接名称'})
  }
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
    return resDataHandle(200, {data: newNav})
  } catch (error) {
    return errorHandler(error)
  }
}
// 获取详情
export async function getNavDetails(id: string): Promise<any> {
  try {
    const nav = await db.nav.findUnique({
      where: {id}
    })
    console.log(nav, 'nav')
    return resDataHandle(200 ,{data: nav})
  } catch (error) {
    return errorHandler(error)
  }
}
// 编辑
export async function editNav(id: string, formData: FormData): Promise<any> {
  const title = formData.get('title') as string;
  const link = formData.get('link') as string;
  const memo = formData.get('memo') as string;
  const boxId = formData.get('boxId') as string;
  const sortOrder = formData.get('sortOrder') as string;

  if(!id) return resDataHandle(400, 'id 未传')
  if(!boxId) return resDataHandle(400, 'boxId 未传')
  if(!title) return resDataHandle(400, 'title 未传')
  if(!link) return resDataHandle(400, 'link 未传')
  try {
    const res = await verifyToken()
    if(!res) return
    const newBox = await db.nav.update({
      where: {id},
      data: {
        title: title,
        sortOrder: Number(sortOrder),
        link,
        memo: memo,
        userId: res.id,
        boxId,
      }
    })
    return resDataHandle(200 ,{data: newBox, message: '修改成功'})
  } catch (error) {
    return errorHandler(error, {text: '连接名称'})
  }
}


// export async function bulkInsertNavTitles(boxId: string) {
//   const titles: any = []

//   try {
//     const data = titles.map((item) => ({
//       ...item,
//       createTime: new Date(),
//       updateTime: new Date(),
//     }));
//     // console.log(data, 'data');
//     const result = await db.nav.createMany({
//       data,
//       skipDuplicates: true,
//     });

//     console.log(`成功插入 ${result.count} 条数据`);
//     return result;
//   } catch (error) {
//     console.error('批量插入失败:', JSON.stringify(error));
//     throw error;
//   }
// }