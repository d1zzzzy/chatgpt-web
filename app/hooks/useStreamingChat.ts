import { useState, useRef } from 'react';

import { ERROR_MESSAGES } from '../constants/errorMessages';

interface StreamingChatProps {
  apiKey: string | null;
  model: string;

  onMessage: (data: Record<string, unknown>) => void;
  onError: (error: Record<string, unknown>) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export const useStreamingChat = ({
  apiKey,
  model,

  onMessage,
  onError,
  onStart,
  onEnd,
}: StreamingChatProps) => {
  const [_model, setModel] = useState<string>(model);
  const abortControllerRef = useRef<AbortController | null>(null);

  const updateModel = (v: string) => {
    setModel(v);
  };

  const handleError = (error: Record<string, unknown>) => {
    let errorMessage: Record<string, unknown> = ERROR_MESSAGES.DEFAULT;

    if (error?.code) {
      switch (error.code) {
        case 'insufficient_quota':
          errorMessage = ERROR_MESSAGES.INSUFFICIENT_QUOTA;
          break;
        case 'invalid_api_key':
          errorMessage = ERROR_MESSAGES.INVALID_API_KEY;
          break;
        case 'rate_limit_exceeded':
          errorMessage = ERROR_MESSAGES.RATE_LIMIT;
          break;
        default:
          errorMessage = {
            title: "API错误",
            message: error.message || ERROR_MESSAGES.DEFAULT.message
          };
      }
    }

    onError(errorMessage);
  };

  const sendMessage = async (message: string) => {
    if (!apiKey) return false;

    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;

    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      onStart?.();

      const messages = [
        { role: 'user', content: message }
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AI Chat App',
        },
        body: JSON.stringify({
          model: _model,
          messages,
          stream: true,
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        if (errorData.error?.message?.includes('No auth credentials found')) {
          throw {
            code: 'invalid_api_key',
            message: '无效的 API Key，请确保您使用了正确的 OpenRouter API Key',
            type: 'auth_error'
          };
        }
        throw {
          code: errorData.error?.code || 'unknown_error',
          message: errorData.error?.message || '请求失败',
          type: errorData.error?.type || 'error'
        };
      }

      reader = response.body?.getReader();
      if (!reader) throw new Error('无法获取响应流');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              onMessage({ type: 'chunk', content });
            } catch (e) {
              console.error('解析响应数据失败:', e);
            }
          }
        }
      }

      onEnd?.();
      return true;
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('请求被取消');
        onEnd?.();
        return true;
      } else {
        console.error('Request Error:', error);
        handleError(error as Record<string, unknown>);
        return false;
      }
    } finally {
      if (reader) {
        try {
          await reader.cancel();
        } catch (e: unknown) {
          // 忽略取消时的错误
          console.log(e)
        }
      }
    }
  };

  const cleanup = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      onEnd?.();
    }
  };

  return {
    updateModel,
    sendMessage,
    cleanup,
  };
};
