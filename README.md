## 运行

```bash
// 安装包
pnpm install

// 启动本地
pnpm dev
```

## 功能介绍

### 登记 API Key

1. 首次进入应用时，用户需要输入自己的 `apiKey`。
2. 应用会将 `apiKey` 加密后存储在 `localStorage` 中，以便后续使用。

### 切换免费模型

1. 提供了两个免费的模型供用户切换使用。
2. 可以根据需要选择不同的模型。

### AI 交互

1. 可以通过输入框与 AI 进行对话。
2. 应用会根据用户输入调用相应的 AI 模型进行响应。

### API Key 验证

1. 在用户输入新的 `apiKey` 时，应用会验证其有效性。
2. 验证成功后，`apiKey` 会被加密并存储。
3. 如果验证失败，用户会收到错误提示，并需要重新输入有效的 `apiKey`。

### 错误处理

1. 在 API Key 验证或存储过程中出现错误时，应用会显示相应的错误信息。
2. 用户可以根据提示进行相应的操作以解决问题。
