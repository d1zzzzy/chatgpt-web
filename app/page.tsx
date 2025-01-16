'use client';

import React, { useState, useEffect, useRef } from "react";
import { Container, Box } from "@mui/material";

import { COLORS } from './constants/colors';
import { useStreamingChat } from './hooks/useStreamingChat';
import type { ModelId } from './constants/models';
import { Header } from './components/Header';
import { Message } from './components/Message';
import { ChatInput } from './components/ChatInput';
import { ErrorMessage } from './components/ErrorMessage';
import ApiKeyDialog from './components/ApiKeyDialog';
import { encrypt, decrypt } from './utils/crypto';

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatApp = () => {
  const [apiKey, setApiKey] = useState<string>("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");
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<{ title: string; message: string } | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelId>('google/gemini-pro');

  // 处理 API Key 的加载和解密
  useEffect(() => {
    try {
      const encryptedApiKey = localStorage.getItem('openrouter_api_key');
      if (encryptedApiKey) {
        const decryptedApiKey = decrypt(encryptedApiKey);

        setApiKey(decryptedApiKey);
      } else {
        setIsApiKeyDialogOpen(true);
      }
    } catch (error) {
      console.error('Failed to load API key:', error);
      setIsApiKeyDialogOpen(true);
    }
  }, []);

  // 自动滚动到最新消息
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 保存和验证新的 API Key
  const handleSaveApiKey = (newKey: string) => {
    const trimmedKey = newKey.trim();
    // 验证 API Key 格式
    if (!trimmedKey.startsWith('sk-or-')) {
      setError({
        title: "API Key 格式错误",
        message: "请输入有效的 OpenRouter API Key。您可以在 https://openrouter.ai/keys 获取 API Key。确保 Key 以 'sk-or-' 开头。"
      });
      return;
    }

    // 测试 API Key 的有效性
    fetch('https://openrouter.ai/api/v1/auth/key', {
      headers: {
        'Authorization': `Bearer ${trimmedKey}`,
        'HTTP-Referer': window.location.origin
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Invalid API Key');
      return response.json();
    })
    .then(data => {
      console.log('API Key 验证成功:', data);
      try {
        // 加密并保存有效的 API Key
        const encryptedApiKey = encrypt(trimmedKey);
        localStorage.setItem('openrouter_api_key', encryptedApiKey);
        setApiKey(trimmedKey);
        setError(null);
      } catch (error) {
        console.error('Failed to save API key:', error);
        setError({
          title: "保存失败",
          message: "无法保存 API Key，请重试。"
        });
      }
    })
    .catch(error => {
      console.error('API Key 验证失败:', error);
      setError({
        title: "API Key 验证失败",
        message: "请确保您的 API Key 有效且有足够的配额。"
      });
    });
  };

  const { sendMessage, updateModel, cleanup } = useStreamingChat({
    apiKey: apiKey || null,
    model: selectedModel,
    onMessage: (data) => {
      setError(null);
      if (data.type === 'chunk') {
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              {
                ...lastMessage,
                content: lastMessage.content + (data.content || '')
              }
            ];
          } else {
            return [
              ...prev,
              {
                role: "assistant",
                content: data.content || ''
              }
            ];
          }
        });
      }
    },
    onError: (error) => {
      console.error('API error:', error);
      setError(error);
      setIsLoading(false);
    },
    onStart: () => {
      setError(null);
      console.log('开始流式传输');
    },
    onEnd: () => {
      setIsLoading(false);
      console.log('流式传输结束');
    },
  });

  useEffect(() => {
    return cleanup;
  }, []);

  // 发送消息并处理 AI 响应
  const handleSend = async () => {
    if (!userInput.trim()) return;

    // 创建用户消息和空的 AI 回复占位
    const userMessage = { role: "user", content: userInput } as Message;
    const pendingAIMessage = { role: "assistant", content: "" } as Message;

    // 立即添加消息到界面，提供即时反馈
    setMessages(prev => [...prev, userMessage, pendingAIMessage]);
    setUserInput("");
    setIsLoading(true);

    // 发送消息到 AI 服务
    const sent = await sendMessage(userInput);

    // 处理发送失败的情况
    if (!sent) {
      setMessages(prev => [
        ...prev.slice(0, -1),  // 移除空的 AI 消息
        {
          role: "assistant",
          content: "发送消息失败，请重试..."
        } as Message,
      ]);
      setIsLoading(false);
    }
  };

  // 切换 AI 模型
  const handleModelChange = (newModel: string) => {
    setSelectedModel(newModel as ModelId)
    updateModel(newModel);
  };

  // 停止 AI 响应生成
  const handleStop = () => {
    cleanup();
    setIsLoading(false);
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: COLORS.background.primary,
        overflow: 'hidden',
      }}
    >
      <Header
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
        onOpenSettings={() => setIsApiKeyDialogOpen(true)}
      />

      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((message, index) => (
          <Message
            key={index}
            role={message.role}
            content={message.content}
            isLoading={isLoading}
            isLast={index === messages.length - 1}
          />
        ))}
      </Box>

      <ChatInput
        value={userInput}
        onChange={setUserInput}
        onSend={handleSend}
        onStop={handleStop}
        isLoading={isLoading}
        disabled={!apiKey || !userInput.trim()}
      />

      <ApiKeyDialog
        open={isApiKeyDialogOpen}
        apiKey={apiKey}
        onClose={() => setIsApiKeyDialogOpen(false)}
        onSave={handleSaveApiKey}
      />

      {error && <ErrorMessage error={error} />}
    </Container>
  );
};

export default ChatApp;
