"use server"
import { cookies } from 'next/headers';
import { db } from "@/db";
import { redirect } from "next/navigation";
import {resDataHandle} from '@/services/common'
import { generateToken, parseToken } from '@/tools/token'
// import user from '../../data/User'
import { headers } from 'next/headers'


export async function login(formData: FormData): Promise<any> {
  // 获取当前页面的 URL
  const name = formData.get('name') as string
  const password = formData.get('password') as string
  const user = await db.user.findFirst({
    where: {name}
  })
  if(user?.password === password) {
    const token =  generateToken(user)
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      maxAge: 60 * 60 * 24, // 1 天
      path: '/', // Cookie 的有效路径
      httpOnly: true, // 仅限 HTTP 访问
      // secure: process.env.NODE_ENV === 'production', // 仅在 HTTPS 下传输
      sameSite: 'strict', // 防止跨站请求伪造
    });
  }else {
    return resDataHandle(500, '密码错误')
  }

  // 获取当前页面的 URL
  const headersList = await headers();
  const url = headersList.get('referer'); // 获取来源 URL
  // 解析查询参数
  const searchParams = new URL(url!).searchParams;
  const redirectValue = searchParams.get('redirect'); // 获取具体的查询参数
  redirect(redirectValue ?? '/home')
}
export async function setup(formData: FormData): Promise<any> {
  const name = formData.get('name') as string
  const password = formData.get('password') as string
  // 先查询一下有没有这个用户
  const user = await db.user.findFirst({
    where: {name}
  })
  if(user) return resDataHandle(500, '用户已存在')
  await db.user.create({
    data: {
      name,
      password,
    },
  });
  redirect('/login')
}


// 退出登录
export async function logout(): Promise<any> {
  return new Promise(async (resolve) => {
    const cookieStore = await cookies()
    cookieStore.delete('token')
    resolve(true)
    redirect('/home')
  })
}

type tokenParseType = null | Record<string, any>
// 获取token
export async function getTokenMsg(): Promise<tokenParseType> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if(!token) return null
  const decoded: tokenParseType = parseToken(token) as tokenParseType
  return decoded ? {
    id: decoded.id,
    name: decoded.name
  } : null
}



export async function bulkInsertUserTitles() {
  try {
    const data: any = []
    console.log(data, 'data');
    // return
    const result = await db.user.createMany({
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








// 示例用法
// const username = 'admin';
// const password = 'password123';

// 生成 Token
// const token = generateToken(username, password);
// console.log('生成的 Token:', token);

// // 解析 Token
// const decodedInfo = parseToken(token);
// if (decodedInfo) {
//   console.log('解析后的信息:', decodedInfo);
// } else {
//   console.log('Token 无效或已过期');
// }