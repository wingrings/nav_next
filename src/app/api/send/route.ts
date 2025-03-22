// app/api/send/route.ts
import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/messages';

export async function POST(request: Request) {
  const { message } = await request.json();
  
  if (message) {
    addMessage(message);
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
}