import { db } from "@/db";
import {justVerifyToken} from '@/tools/token'
import {resDataHandle, errorHandler} from '@/services/common'
// import { redirect } from "next/navigation";

type navType = ({
  memo: string;
  title: string;
  id: string;
  password?: string | null;
  link: string;
});
type boxType = ({
  memo: string;
  title: string;
  id: string;
  nav: navType[] | null
  password?: string
})

interface dataType {
  name: string;
  box: boxType[];
}

export async function getUserWithBoxAndNav(user: string): Promise<{data: dataType}> {
  const bool = await justVerifyToken()
  try {
    const userData: any = await db.user.findUnique({
      where: {
        name: user,
      },
      select: {
        name: true,
        box: {
          where: {
            isShow: 1, // 只返回 isShow 为 1 的 box
          },
          select: {
            title: true,
            memo: true,
            password: !bool,
            nav: {
              where: {
                isShow: 1, // 只返回 isShow 为 1 的 box
              },
              select: {
                password: !bool,
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

    if(bool) {
      return resDataHandle(200, {data: userData}) as {data: dataType}
    }

    // 查询后处理数据
    if (userData?.box) {
      userData.box = userData.box.map((box: boxType) => {
        // 判断 box 的 password
        if (box.password && box.password.trim() !== '') {
          box.nav = null; // 如果 box 的 password 不为空字符串，设置 nav 为 null
        } else if (box.nav) {
          // 如果 box 的 password 为空字符串，进一步检查 nav 的 password
          box.nav = box.nav.map((nav) => {
            if (nav.password && nav.password.trim() !== '') {
              // 如果 nav 的 password 不为空字符串，将 title、memo、link 替换为 ****
              nav.title = '****';
              nav.memo = '隐私,相信我,不登录你跳不过去的';
              nav.link = '';
            }
            delete nav.password; // 移除 nav 的 password 字段
            return nav;
          });
        }
        delete box.password; // 移除 box 的 password 字段
        return box;
      });
    }
    if (!userData) {
      throw new Error('User not found');
    }
    return resDataHandle(200, {data: userData}) as {data: dataType}
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