"use server"
import { headers } from 'next/headers'

export async function getRouterParams(key: string = ''): Promise<Record<string, any> | string | null> {
    // 获取当前页面的 URL
    const headersList = await headers();
    const url = headersList.get('referer'); // 获取来源 URL
    // 解析查询参数
    const searchParams = new URL(url!).searchParams;
    if(key) {
      return searchParams.get(key)
    }
    return Object.fromEntries(searchParams)
}