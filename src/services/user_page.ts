import { db } from "@/db";
import {resDataHandle, errorHandler} from '@/services/common'
// import { redirect } from "next/navigation";

interface dataType {
  name: string;
  box: {
    memo: string;
    title: string;
    id: string;
    nav: {
      memo: string;
      title: string;
      id: string;
    };
  }[];
}

export async function getUserWithBoxAndNav(user: string): Promise<{data: dataType}> {
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
              },
              orderBy: [{
                sortOrder: 'asc', // nav 按照 sortOrder 从小到大排序
              },
              {
                createTime: 'asc', // 如果 sortOrder 相同，按照 createTime 从早到晚排序
              }]
            }
          },
          orderBy: [{
            sortOrder: 'asc', // box 按照 sortOrder 从小到大排序
          },
          {
            createTime: 'asc', // 如果 sortOrder 相同，按照 createTime 从早到晚排序
          }],
        },
      },
    });
    return resDataHandle(200, {data:userData}) as {data: dataType}
  } catch(error) {
    return errorHandler(error) as {data: dataType}
  }
}



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