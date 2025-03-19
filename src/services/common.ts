import type {responseType} from '@/types'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function resDataHandle(code: number, data: any): responseType {
  let resData = {}
  let message = ''
  if(typeof data === 'string') {
    message = data
  }else {
    resData = data
  }
  if(code === 200) {
    return {
      code,
      success: true,
      message,
      ...resData
    }
  } else {
    return {
      code,
      success: false,
      message,
      ...resData
    }
  }
}


export function errorHandler(error: any, {text}: {text: string} = {text: ''}) {
  // 处理 Prisma 唯一约束错误
  if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
    return resDataHandle(400, { message: `${text}已存在，请使用其他${text}` });
  }

  // 处理其他 Prisma 错误
  if (error instanceof PrismaClientKnownRequestError) {
    return resDataHandle(500, { message: '数据库操作失败，请稍后重试' });
  }

  // 处理通用错误
  return resDataHandle(500, { message: '服务器内部错误，请稍后重试' });
}