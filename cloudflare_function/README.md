# Dice Don't Thanks - Cloudflare Function

這是「骰子不用謝」LINE Bot 的 Cloudflare Function 版本。

## 部署後的 Webhook URL

部署完成後，你會看到類似這樣的 URL：
```
https://{YOUR_WORKER_NAME}.{YOUR_SUBDOMAIN}.workers.dev
```

請將此 URL 設定為你的 LINE Bot Webhook URL。每個人部署後的 URL 都會不同，請使用 `wrangler deploy` 指令輸出的 URL。

## 環境變數設置

本專案使用了以下環境變數：

- `CHANNEL_ACCESS_TOKEN`: LINE Bot 的 Channel Access Token
- `CHANNEL_SECRET`: LINE Bot 的 Channel Secret
- `GITHUB_PAGES_URL`: GitHub Pages 的網址

### 本地開發

1. 在專案根目錄建立 `.dev.vars` 文件
2. 將以下內容加入到 `.dev.vars` 文件中（替換成你的值）：

```plaintext
CHANNEL_ACCESS_TOKEN="your_channel_access_token"
CHANNEL_SECRET="your_channel_secret"
GITHUB_PAGES_URL="your_github_pages_url"
```

### 生產環境

使用 wrangler secret 命令設置生產環境的環境變數：

```bash
cd cloudflare_function && npx wrangler secret put CHANNEL_ACCESS_TOKEN
cd cloudflare_function && npx wrangler secret put CHANNEL_SECRET
cd cloudflare_function && npx wrangler secret put GITHUB_PAGES_URL
```

確認環境變數是否設置成功：

```bash
cd cloudflare_function && npx wrangler secret list
```

## 部署步驟

```bash
cd cloudflare_function && npx wrangler deploy
```

## 驗證環境變數

你可以透過以下方式驗證環境變數是否正確設置：

1. 列出所有已設置的 secrets：
```bash
npx wrangler secret list
```

2. 呼叫測試端點來驗證 Worker 是否能讀取到環境變數：
```bash
curl https://{YOUR_WORKER_URL}/check-env
```

如果環境變數設置正確，你應該會看到類似以下的輸出：
```json
{
  "hasChannelAccessToken": true,
  "hasChannelSecret": true,
  "hasGithubPagesUrl": true,
  "channelAccessTokenLength": 172,
  "channelSecretLength": 32,
  "githubPagesUrl": "dice.kamigo.tw"
}
```