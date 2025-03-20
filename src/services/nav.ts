"use server"
import { db } from "@/db";
import {resDataHandle, errorHandler} from '@/services/common'
import dayjs from "dayjs";
// import { redirect } from "next/navigation";
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
  const title = formData.get('title') as string;
  const link = formData.get('link') as string;
  const memo = formData.get('memo') as string;
  const boxId = formData.get('boxId') as string;

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
        boxId
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


export async function bulkInsertNavTitles(boxId: string) {
  const titles: {link: string; title: string; introduction: string}[] = [{
    "link": "https://antv-x6.gitee.io/zh/examples/showcase/practices#algo-flow",
    "title": "antv X6",
    "introduction": "要调研的antv X6图形"
  },
  {
    "link": "http://10.12.97.2/",
    "title": "Cloud辅助工具平台",
    "introduction": ""
  },
  {
    "link": "http://10.12.97.1/front-end/boc-network-web",
    "title": "github",
    "introduction": "项目github"
  },
  {
    "link": "http://10.12.40.43:7001/venus-fara/#/",
    "title": "防火墙独立地址",
    "introduction": "Vite App http://10.12.40.43:8066/galaxy-sun/venus-fara/"
  },
  {
    "link": "http://10.12.40.45:8082/",
    "title": "工作台 [Jenkins]",
    "introduction": "工作台 [Jenkins] http://10.12.40.45:8082/"
  },
  {
    "link": "http://10.12.248.28/fsaas/#id=vlbb8m&p=%E9%98%B2%E7%81%AB%E5%A2%99%E4%BA%A7%E5%93%81",
    "title": "南天集群原型",
    "introduction": ""
  },
  {
    "link": "http://10.12.97.3/Cloud/fsaas/#id=vlbb8m&p=%E9%98%B2%E7%81%AB%E5%A2%99%E4%BA%A7%E5%93%81",
    "title": "防火墙原型地址2",
    "introduction": ""
  },
  {
    "link": "http://10.12.97.3/Cloud/sw/",
    "title": "交换机原型图",
    "introduction": "index http://10.12.97.3/Cloud/sw/"
  },
  {
    "link": "http://10.12.40.43:7101/solar/swagger-ui/index.html",
    "title": "防火墙Swagger UI",
    "introduction": "http://10.12.40.43:8010/venus/fara/swagger-ui/index.html"
  },
  {
    "link": "https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD",
    "title": "vue-element-admin",
    "introduction": "vue后台管理框架"
  },
  {
    "link": "http://10.12.97.3/Cloud/fsaas/#id=vlbb8m&p=防火墙产品",
    "title": "防火墙产品（新版）",
    "introduction": "防火墙产品 http://10.12.97.3/Cloud/fsaa"
  },
  {
    "link": "https://oa.nantian.com.cn:8543/defaultroot/login.jsp",
    "title": "南天OA",
    "introduction": ""
  },
  {
    "link": "http://10.12.40.44:7001/venus-sw/",
    "title": "交换机部署后的开发环境",
    "introduction": "SW http://10.12.40.44:7001/venus-sw/"
  },
  {
    "link": "http://10.12.40.44:8066/venus-fara-ipam#/",
    "title": "南天云",
    "introduction": "南天云 http://10.12.40.44:8066/venus-fara-ipam"
  },
  {
    "link": "http://10.12.40.44:7001/jupiter/#/task-manage/data-development/offline-development",
    "title": "数据平台（华夏银行）",
    "introduction": ""
  },
  {
    "link": "http://mail.nantian.com.cn/",
    "title": "南天企业邮箱",
    "introduction": ""
  },
  {
    "link": "http://10.12.97.2/fw/fsaas/#id=vlbb8m&p=%E9%98%B2%E7%81%AB%E5%A2%99%E4%BA%A7%E5%93%81",
    "title": "防火墙原型图",
    "introduction": ""
  }
]
  try {
    const data = titles.map((item) => ({
      title: item.title,
      link: item.link,
      memo: item.introduction,
      boxId,
      userId: 'cm8gxbg61000dfy8gpfoox3n7',
    }));
    console.log(data, 'data');
    const result = await db.nav.createMany({
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