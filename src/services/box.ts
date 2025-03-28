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
  const posts = await db.box.findMany({
    where: {userId},
    select: {
      id: true,
      title: true,
      isShow: true,
      password: true,
      isCover: true,
      sortOrder: true,
      memo: true,
      createTime: true,
      updateTime: true,
    },
    orderBy: {
      sortOrder: 'asc',
    }
  });

  return posts.map(post => ({
    ...post,
    createTime: dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss'),
    updateTime: dayjs(post.updateTime).format('YYYY-MM-DD HH:mm:ss'),
  }));
}


// 添加
export async function addBox(_prevState: any, formData: FormData): Promise<any> {
  const title = formData.get('title') as string
  const memo = formData.get('memo') as string
  const sortOrder = formData.get('sortOrder') as string
  const isShow = formData.get('isShow') as string
  const isCover = formData.get('isCover') as string
  const password = formData.get('password') as string
  try {
    const res = await verifyToken()
    if(!res) return
    const newBox = await db.box.create({
      data: {
        title,
        memo,
        sortOrder: Number(sortOrder),
        isShow: Number(isShow),
        isCover: Number(isCover),
        password,
        userId: res.id,
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
    return (errorHandler(error, {message: '此盒子中有链接，请先将链接删除完，再进行此操作'}))
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
  const isCover = formData.get('isCover') as string
  const password = formData.get('password') as string
  try {
    const newBox = await db.box.update({
      where: {id},
      data: {
        title: formData.get('title') as string,
        memo: formData.get('memo') as string,
        sortOrder: Number(formData.get('sortOrder')),
        isShow: Number(formData.get('isShow')),
        isCover: Number(isCover),
        password,
        userId: res.id
      }
    })
    return resDataHandle(200 ,{data: newBox, message: '修改成功'})
  } catch(error) {
    return errorHandler(error, {text: '标题'})
  }
}

export async function getBoxDetailsByPassword(formData: FormData): Promise<any> {
  const id = formData.get('id') as string
  const password = formData.get('password') as string
  try {
    // 先查询一下这个id是否存在
    const box = await db.box.findUnique({
      where: {id},
      select: {
        id: true,
        title: true,
        password: true,
        nav: {
          where: {
            isShow: 1, // 只返回 isShow 为 1 的 box
          },
          select: {
            isCover: true,
            title: true,
            memo: true,
            link: true
          },
          orderBy: [{
            sortOrder: 'asc', // nav 按照 sortOrder 从小到大排序
          },
          {
            createTime: 'asc', // 如果 sortOrder 相同，按照 createTime 从早到晚排序
          }]
        }
      }
    })
    if(!box) return resDataHandle(500, 'id不存在')
    if(box.password !== password) return resDataHandle(500, '密码错误')
    return resDataHandle(200,{data: 
      {
        ...box,
        password: undefined
      }
    })
  } catch (error) {
    return (errorHandler(error, {message: '此盒子中有链接，请先将链接删除完，再进行此操作'}))
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
