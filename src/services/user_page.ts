import { db } from "@/db";
import {resDataHandle, errorHandler} from '@/services/common'
// import { redirect } from "next/navigation";
import {verifyToken} from '@/tools/token'


export async function getUserWithBoxAndNav(user: string) {
  const res = await verifyToken()
  if(!res) return
  try {
    const userData = await db.user.findUnique({
      where: {
        name: user,
      },
      select: {
        name: true,
        box: {
          select: {
            title: true,
            memo: true,
            nav: {
              select: {
                title: true,
                memo: true,
                link: true
              }
            }
          },
        },
      },
    });
    return resDataHandle(200, {data:userData})
  } catch(error) {
    return errorHandler(error)
  }
}