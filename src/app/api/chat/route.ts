
// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { addClient, getMessages } from '@/lib/messages';

export async function GET() {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // 创建 SSE 响应
  const response = new NextResponse(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });

  // 发送历史消息
  const history = getMessages();
  history.forEach(msg => {
    writer.write(encoder.encode(`data: ${JSON.stringify(msg)}\n\n`));
  });

  // 注册客户端
  addClient({
    write: (data: string) => writer.write(encoder.encode(data)),
    on: (event: string,
      //  _callback: () => void
      ) => { 
      console.log('添加成功')
      if(event === 'close') {
        // callback()
      }
    }
  } as any);

  return response;
}