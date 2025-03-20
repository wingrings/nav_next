import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.url === '/.well-known/vercel') {
    return res.status(200).json({ status: 'ok' });
  }
  // 其他逻辑
}

