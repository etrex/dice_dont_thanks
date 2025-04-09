import { extractEvents, replyMessage, getDisplayName } from './line.js';
import { handleEvent } from './handle_event.js';

export default {
  async fetch(request, env) {
    console.log('Received request:', request.method);

    // 測試路由：檢查環境變數
    if (request.url.endsWith('/check-env')) {
      return new Response(JSON.stringify({
        hasChannelAccessToken: !!env.CHANNEL_ACCESS_TOKEN,
        hasChannelSecret: !!env.CHANNEL_SECRET,
        hasGithubPagesUrl: !!env.GITHUB_PAGES_URL,
        channelAccessTokenLength: env.CHANNEL_ACCESS_TOKEN?.length,
        channelSecretLength: env.CHANNEL_SECRET?.length,
        githubPagesUrl: env.GITHUB_PAGES_URL
      }, null, 2));
    }
    
    try {
      // 提取事件
      const events = await extractEvents(request);
      
      // 如果是 webhook 驗證請求，直接回應 OK
      if (events.length === 0) {
        console.log('LINE webhook verification request');
        return new Response('OK', { status: 200 });
      }

      // 處理所有事件
      console.log(`Processing ${events.length} events`);
      for (const event of events) {
        try {
          console.log('Processing event:', JSON.stringify(event));

          // 取得使用者名稱
          const displayName = event.source?.userId ? await getDisplayName(event.source.userId, env) : null;

          // 處理事件
          const message = await handleEvent(event, displayName, env);
          
          // 如果有要回覆的訊息，就回覆
          if (message) {
            await replyMessage(event.replyToken, message, env);
          }
        } catch (eventError) {
          // 記錄單一事件的錯誤，但繼續處理其他事件
          console.error('Error processing event:', eventError);
        }
      }

      return new Response('OK', { status: 200 });
    } catch (error) {
      console.error('Error:', error);
      if (error.name === 'LineWebhookError') {
        return new Response(error.message, { status: error.status });
      }
      return new Response('Internal server error', { status: 500 });
    }
  }
};