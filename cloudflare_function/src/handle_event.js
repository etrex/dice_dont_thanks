import { createMenuMessage } from './messages/menu.js';
import { createDiceMessage } from './messages/dice.js';
import { create666Message } from './messages/666.js';

// 定義命令處理器
const commands = [
  {
    match: (text) => text === '選單' || text === 'menu' || text === '說明' || text === 'help',
    handle: async (env) => createMenuMessage(env)
  },
  {
    match: (text) => text === '666',
    handle: async (displayName, env) => create666Message(displayName, env)
  },
  {
    match: (text) => text && text.trim() && text.match(/^骰+$/),
    handle: async (displayName, env, text) => {
      const dices = generateDiceResults(text.length);
      return createDiceMessage(dices, displayName, env);
    }
  }
];

// 生成骰子結果
function generateDiceResults(count) {
  const diceCount = Math.min(count, 10);
  return Array.from({length: diceCount}, () => Math.floor(Math.random() * 6) + 1);
}

// 處理事件
export async function handleEvent(event, displayName, env) {
  // 取得使用者輸入
  const userMessage = event.type === 'message' && event.message.type === 'text'
    ? event.message.text
    : event.type;
  
  console.log('User message:', userMessage);

  // 尋找並執行匹配的命令
  for (const command of commands) {
    if (command.match(userMessage)) {
      return await command.handle(displayName, env, userMessage);
    }
  }

  return null;
}