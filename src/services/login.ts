"use server"
import { cookies } from 'next/headers';
import { db } from "@/db";
import { redirect } from "next/navigation";
import {resDataHandle} from '@/services/common'
import { generateToken } from '@/tools/token'


export async function login(formData: FormData): Promise<any> {
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
  redirect('/box')
}
export async function setup(formData: FormData): Promise<any> {
  console.log(formData, 'formData');
  const name = formData.get('name') as string
  const password = formData.get('password') as string
  // 先查询一下有没有这个用户
  const user = await db.user.findFirst({
    where: {name}
  })
  console.log(user, 'user');
  if(user) return resDataHandle(500, '用户已存在')
  await db.user.create({
    data: {
      name,
      password,
    },
  });
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