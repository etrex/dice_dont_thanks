// LINE Messaging API 的設定
const CHANNEL_ACCESS_TOKEN = 'YOUR_CHANNEL_ACCESS_TOKEN';
const CHANNEL_SECRET = 'YOUR_CHANNEL_SECRET';
const GITHUB_PAGES_URL = 'dice.kamigo.tw';

// 處理 POST 請求
function doPost(e) {
  const event = JSON.parse(e.postData.contents).events[0];
  
  // 取得使用者輸入
  let userMessage;
  if (event.type === 'message' && event.message.type === 'text') {
    userMessage = event.message.text;
  } else {
    userMessage = event.type;
  }
  
  // 處理各種指令
  if (isMenuCommand(userMessage)) {
    return replyMenuMessage(event);
  }
  
  if (userMessage === '!666') {
    return reply666Result(event);
  }
  
  // 檢查是否為有效的骰子指令（只包含「骰」字且長度不超過10）
  if (isValidDiceCommand(userMessage)) {
    return replyDiceResult(event);
  }
}

// 檢查是否為選單相關指令
function isMenuCommand(message) {
  const menuCommands = ['目錄', '功能', '使用說明', '說明', 'menu', 'follow', 'join', 'help'];
  return menuCommands.includes(message.toLowerCase());
}

// 回覆選單訊息
function replyMenuMessage(event) {
  const menuMessage = {
    type: 'flex',
    altText: '骰子不用謝 - 使用說明',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '骰子不用謝 - 使用說明',
            weight: 'bold',
            size: 'lg',
            margin: 'md'
          },
          {
            type: 'separator',
            margin: 'lg'
          },
          {
            type: 'text',
            text: '基本指令：',
            weight: 'bold',
            size: 'sm',
            margin: 'lg'
          },
          {
            type: 'text',
            text: '• 輸入「骰」：擲一顆骰子',
            size: 'sm',
            margin: 'sm'
          },
          {
            type: 'text',
            text: '• 輸入多個「骰」：同時擲多顆骰子',
            size: 'sm',
            margin: 'sm'
          },
          {
            type: 'text',
            text: '特殊指令：',
            weight: 'bold',
            size: 'sm',
            margin: 'lg'
          },
          {
            type: 'text',
            text: '• !666：擲出三個六',
            size: 'sm',
            margin: 'sm'
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
  
  return replyMessage(event.replyToken, menuMessage);
}

// 回覆 666 結果
function reply666Result(event) {
  const dices = [6, 6, 6];
  const sum = 18;
  
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

  return replyMessage(event.replyToken, flexMessage);
}

// 檢查是否為有效的骰子指令
function isValidDiceCommand(message) {
  return message.split('').every(char => char === '骰');
}

// 擲骰子並產生回應
function replyDiceResult(event) {
  // 限制骰子數量最多為 10
  const diceCount = Math.min(event.type === 'message' ? event.message.text.length : 1, 10);
  const dices = Array.from({length: diceCount}, () => Math.floor(Math.random() * 6) + 1);
  const sum = dices.reduce((a, b) => a + b, 0);
  
  // 建 LINE Flex Message
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