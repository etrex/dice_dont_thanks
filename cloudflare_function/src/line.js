// LINE Webhook 錯誤
class LineWebhookError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'LineWebhookError';
  }
}

// 從 LINE Webhook 請求中提取事件
export async function extractEvents(request) {
  // 驗證請求方法
  if (request.method !== 'POST') {
    throw new LineWebhookError('Method not allowed', 405);
  }

  // 驗證 LINE 簽名
  const signature = request.headers.get('x-line-signature');
  if (!signature) {
    throw new LineWebhookError('Missing signature', 401);
  }

  // 解析請求體
  const body = await request.json();

  // 驗證請求體
  if (!body.events) {
    throw new LineWebhookError('Invalid webhook body', 400);
  }

  // LINE webhook verification request
  if (body.events.length === 0) {
    return [];
  }

  return body.events;
}

// 取得用戶顯示名稱
export async function getDisplayName(userId, env) {
  const response = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
    headers: {
      'Authorization': `Bearer ${env.CHANNEL_ACCESS_TOKEN}`
    }
  });
  
  if (!response.ok) return null;
  
  const profile = await response.json();
  return profile.displayName;
}

// 發送 LINE 訊息
export async function replyMessage(replyToken, messages, env) {
  console.log('Sending reply:', JSON.stringify(messages));
  console.log('Using token:', replyToken);
  const response = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [messages]
    })
  });

  if (!response.ok) {
    console.error('Error sending message:', await response.text());
    return new Response('Error sending message', { status: 500 });
  }

  return new Response('OK', { status: 200 });
}