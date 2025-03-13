'use server'

import db from '@/db/lowdb'
// import mainData from '@/data/main.json'


export async function getBoxList() {
  return db.data
  // console.log(boxList, 'boxList?????')
  
}
export async function setBoxList() {
  await db.update(({ boxList }) => {
    console.log(boxList, 'boxList')
    boxList.push(...[
      "常用",
      "UI框架",
      "安装包官网",
      "其他",
      "工具",
      "开发插件",
      "服务端",
      "博客大佬",
      "包下载地址",
      "娱乐",
      "南天",
      "爱康项目网址"
    ])
  })
}