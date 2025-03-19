import { db } from "@/db";
import {resDataHandle, errorHandler} from '@/services/common'
// import { redirect } from "next/navigation";


export async function getUserWithBoxAndNav(user: string) {
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