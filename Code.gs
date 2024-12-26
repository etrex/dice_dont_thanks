// LINE Messaging API 的設定
const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';
const CHANNEL_SECRET = 'YOUR_CHANNEL_SECRET';
const GITHUB_PAGES_URL = 'dice.kamigo.tw';

// 處理 POST 請求
function doPost(e) {
  const event = JSON.parse(e.postData.contents).events[0];
  
  // 如果不是文字訊息，直接結束
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // 取得使用者輸入的文字
  const userMessage = event.message.text;
  
  // 檢查是否為有效的骰子指令（只包含「骰」字且長度不超過10）
  if (!isValidDiceCommand(userMessage)) {
    return;
  }

  // 擲骰子並回傳結果
  return replyDiceResult(event);
}

// 檢查是否為有效的骰子指令
function isValidDiceCommand(message) {
  return message.split('').every(char => char === '骰') && message.length <= 10;
}

// 擲骰子並產生回應
function replyDiceResult(event) {
  const diceCount = event.message.text.length;
  const dices = Array.from({length: diceCount}, () => Math.floor(Math.random() * 6) + 1);
  const sum = dices.reduce((a, b) => a + b, 0);
  
  // 建��� LINE Flex Message
  const flexMessage = {
    type: 'flex',
    altText: `${event.source.userId} 骰出的結果：${sum}`,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `骰出的結果：${sum}`,
            weight: 'bold',
            size: 'sm'
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: dices.map((dice, index) => ({
              type: 'image',
              url: `https://${GITHUB_PAGES_URL}/images/dice/${index%2+1}/${dice}.png`
            }))
          },
          {
            type: 'separator',
            margin: 'lg',
            color: '#cccccc'
          },
          {
            type: 'text',
            text: '點擊以下圖示擲骰',
            weight: 'bold',
            size: 'sm',
            margin: 'lg'
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'image',
                url: `https://${GITHUB_PAGES_URL}/images/button_1.png`,
                action: {
                  type: 'message',
                  text: '骰'
                }
              },
              {
                type: 'image',
                url: `https://${GITHUB_PAGES_URL}/images/button_2.png`,
                action: {
                  type: 'message',
                  text: '骰骰'
                }
              }
            ]
          }
        ]
      }
    }
  };

  // 發送訊息
  return replyMessage(event.replyToken, flexMessage);
}

// 發送 LINE 訊息
function replyMessage(replyToken, messages) {
  const url = 'https://api.line.me/v2/bot/message/reply';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  
  const payload = {
    replyToken: replyToken,
    messages: [messages]
  };

  const options = {
    method: 'post',
    headers: headers,
    payload: JSON.stringify(payload)
  };

  try {
    UrlFetchApp.fetch(url, options);
  } catch (error) {
    console.error('Error sending message:', error);
  }
} 