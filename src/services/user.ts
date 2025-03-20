"use server"
import { db } from "@/db";
import {resDataHandle, errorHandler} from '@/services/common'

// import { cookies } from 'next/headers';
// const cookieStore = await cookies()

export async function getUserMsgByName(name: string): Promise<any> {
  try{
    const userData = await db.user.findUnique({
      where: {name},
      select: {
        name: true,
      }
    })
    return resDataHandle(200, {data:userData}) as {data: {name: string}}
  } catch(error) {
    return errorHandler(error) as {data: {name: string}}
  }
}