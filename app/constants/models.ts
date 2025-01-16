export const AVAILABLE_MODELS = [
  {
    id: 'google/gemini-pro',
    name: 'Gemini Pro',
    description: 'Google最新的大语言模型，支持32k上下文',
    maxTokens: 32768,
  },
  {
    id: 'anthropic/claude-2.1',
    name: 'Claude 2.1',
    description: 'Anthropic的强大模型，支持200k上下文',
    maxTokens: 200000,
  },
] as const;

export type ModelId = typeof AVAILABLE_MODELS[number]['id'];
