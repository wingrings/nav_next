import jwt from 'jsonwebtoken'
import { cookies, headers } from 'next/headers';
import { redirect } from "next/navigation";
import { db } from "@/db";

// import {sessionStore} from './session'


type tokenMsgType = {
  name: string;
  password: string
} | null

// 密钥（用于签名和验证 Token）
const SECRET_KEY = process.env.SECRET_KEY!; // 请替换为一个安全的密钥

// console.log(sessionStore, 'sessionStore>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

// export function createSession(userId: number, token: string) {
//   sessionStore.set(userId, token); // 将 Token 存储到内存中
//   console.log(userId,sessionStore, sessionStore.get(userId), 'sessionStore');
//   return token;
// }


/**
 * 生成 Token
 * @param {string} username - 账号
 * @param {string} password - 密码
 * @returns {string} - 生成的 Token
 */
export function generateToken(data: {id: string, name: string}) {

  // 将账号和密码作为 Payload
  const payload = data;
  // 生成 Token，设置过期时间（例如 1 小时）
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  // createSession(data.id, token);
  return token;
}

/**
 * 解析 Token
 * @param {string} token - 需要解析的 Token
 * @returns {object} - 解析后的账号和密码信息
 */
export function parseToken(token: string) {
  try {
    // 验证并解析 Token
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error: any) {
    // 如果 Token 无效或过期，返回错误信息
    console.error('Token 解析失败:', JSON.stringify(error));
    return null;
  }
}

// 获取解析后的token信息
export async function getTokenMsg(): Promise<tokenMsgType> {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if(!token) return null
  const data: any = await parseToken(token)
  return data
}


export async function verifyToken() {
  const headersList = await headers();
  const url = headersList.get('referer'); // 获取来源 URL
  const params = new URL(url ?? '');
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if(!token) redirect( params.pathname ? `/login?redirect=${params.pathname}`: '/login')
  const decoded: string | jwt.JwtPayload | null = parseToken(token)
  if (typeof decoded === 'string' || !decoded) {
    redirect( params.pathname ? `/login?redirect=${params.pathname}`: '/login')
  };
  return {id: decoded.id, name: decoded.name}
}

export async function justVerifyToken() {
  const msg = await getTokenMsg()
  if(msg && msg.name && msg.password) {
    const name = msg?.name as string
    const password = msg?.password as string
    const user = await db.user.findFirst({
      where: {name}
    })
    if(user?.password === password) return true
  }
  return false
}

