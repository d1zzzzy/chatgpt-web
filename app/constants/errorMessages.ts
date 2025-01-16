export const ERROR_MESSAGES = {
  INSUFFICIENT_QUOTA: {
    title: "配额不足",
    message: "您的API使用配额已耗尽，请检查您的账户余额或升级计划。详情请参考：https://platform.openai.com/docs/guides/error-codes/api-errors"
  },
  INVALID_API_KEY: {
    title: "API密钥无效",
    message: "请检查您的API密钥是否正确，或尝试重新生成一个新的密钥。"
  },
  RATE_LIMIT: {
    title: "请求过于频繁",
    message: "您的请求频率超出限制，请稍后再试。"
  },
  CONNECTION_ERROR: {
    title: "连接错误",
    message: "无法连接到服务器，请检查您的网络连接后重试。"
  },
  DEFAULT: {
    title: "发生错误",
    message: "抱歉，处理您的请求时出现错误。请稍后重试。"
  }
};
