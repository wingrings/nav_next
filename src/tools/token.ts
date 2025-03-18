import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
// import {sessionStore} from './session'

// 密钥（用于签名和验证 Token）
const SECRET_KEY = 'your-secret-key'; // 请替换为一个安全的密钥
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
    console.error('Token 解析失败:', error?.message || error);
    return null;
  }
}


export async function verifyToken() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if(!token) redirect('/')
  const decoded: string | jwt.JwtPayload | null = parseToken(token)
  console.log(decoded,typeof decoded === 'string' || !decoded, 'decoded');
  if (typeof decoded === 'string' || !decoded) {
    redirect('/login')
  };
  return {id: decoded.id, name: decoded.name}
}


