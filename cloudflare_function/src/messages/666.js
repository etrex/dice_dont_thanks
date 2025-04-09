export function create666Message(displayName, env) {
  const dices = [6, 6, 6];
  
  return {
    type: 'flex',
    altText: `${displayName || '某人'} 骰出的結果：18`,
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: `${displayName ? displayName + ' 的 666：' : '666 結果：'}18`,
            weight: 'bold',
            size: 'sm'
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: dices.map((dice, index) => ({
              type: 'image',
              url: `https://${env.GITHUB_PAGES_URL}/images/dice/${index%2+1}/${dice}.png`
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