// lib/messages.ts
const messages: string[] = [];
let clients: Response[] = [];

// 添加消息并通知所有客户端
export function addMessage(message: string) {
  // 添加新消息
  messages.push(message);

  // 如果数组长度超过 10，删除前面的元素
  if (messages.length > 10) {
    messages.splice(0, messages.length - 10); // 删除前面的元素，保留最后 10 个
  }




  clients.forEach((client: any) => {
    const data = `data: ${JSON.stringify(message)}\n\n`;
    client.write(data);
  });
}

// 注册 SSE 客户端
export function addClient(client: any) {
  clients.push(client);
  client?.on('close', () => {
    clients = clients.filter(c => c !== client);
  });
}

// 获取历史消息
export function getMessages() {
  return messages;
}