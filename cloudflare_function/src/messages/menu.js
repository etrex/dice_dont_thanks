export function createMenuMessage(env) {
  return {
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
                url: `https://${env.GITHUB_PAGES_URL}/images/button_1.png`,
                action: {
                  type: 'message',
                  text: '骰'
                }
              },
              {
                type: 'image',
                url: `https://${env.GITHUB_PAGES_URL}/images/button_2.png`,
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
}