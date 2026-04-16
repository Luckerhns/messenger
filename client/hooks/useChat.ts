"use client";

import { useState, useEffect } from "react";
import { IChat, IMessage } from "@/types/chat";

type MessageList = IMessage[];

export const mockData: Record<string, { chat: IChat; messages: MessageList }> =
  [
    {
      "chat-abc123": {
        chat: {
          id: 1,
          name: "John Doe",
          type: "private" as const,
          avatar: "https://i.pravatar.cc/40?img=1",
          lastMessage: "Hey, how are you?",
          lastTime: "14:30",
          unreadCount: 2,
          uniqueLink: "chat-abc123",
          participants: [1, 2],
        },
        messages: [
          {
            id: 1,
            chatId: "chat-abc123",
            senderId: 2,
            senderName: "John Doe",
            content: "Hey, how are you? 😊",
            timestamp: "14:25",
            isOwn: false,
          },
          {
            id: 2,
            chatId: "chat-abc123",
            senderId: 1,
            senderName: "You",
            content: "Pretty good! What\\'s up?",
            timestamp: "14:27",
            isOwn: true,
          },
          {
            id: 3,
            chatId: "chat-abc123",
            senderId: 2,
            senderName: "John Doe",
            content: "Just checking in 👋",
            timestamp: "14:30",
            isOwn: false,
          },
          {
            id: 4,
            chatId: "chat-abc123",
            senderId: 2,
            senderName: "John Doe",
            isFile: true,
            fileUrl: "https://via.placeholder.com/200x150.png?text=photo.jpg",
            content: "photo.jpg",
            timestamp: "14:32",
            isOwn: false,
          },
        ],
      },
      "group-work456": {
        chat: {
          id: 2,
          name: "Work Group",
          type: "group" as const,
          avatar: "https://i.pravatar.cc/40?img=2",
          lastMessage: "Meeting tomorrow at 10am 📅",
          lastTime: "Yesterday",
          unreadCount: 0,
          uniqueLink: "group-work456",
          participants: [1, 3, 4],
        },
        messages: [
          // 6-8 mock messages for group
          {
            id: 1,
            chatId: "group-work456",
            senderId: 3,
            senderName: "Alice",
            content: "Meeting tomorrow at 10am 📅",
            timestamp: "09:15",
            isOwn: false,
          },
          {
            id: 2,
            chatId: "group-work456",
            senderId: 4,
            senderName: "Bob",
            content: "Perfect, I\\'ll prepare the slides.",
            timestamp: "09:20",
            isOwn: false,
          },
          {
            id: 3,
            chatId: "group-work456",
            senderId: 1,
            senderName: "You",
            content: "+1",
            timestamp: "09:22",
            isOwn: true,
          },
          {
            id: 4,
            chatId: "group-work456",
            senderId: 3,
            senderName: "Alice",
            content: "Here is the agenda:",
            timestamp: "09:25",
            isOwn: false,
          },
          {
            id: 5,
            chatId: "group-work456",
            senderId: 3,
            senderName: "Alice",
            isFile: true,
            fileUrl: "https://via.placeholder.com/300x200.png?text=agenda.pdf",
            content: "agenda.pdf",
            timestamp: "09:26",
            isOwn: false,
          },
        ],
      },
      "channel-news789": {
        chat: {
          id: 3,
          name: "Telegram News",
          type: "channel" as const,
          avatar: undefined,
          lastMessage: "Breaking news... 🚨",
          lastTime: "2 min ago",
          unreadCount: 5,
          uniqueLink: "channel-news789",
          participants: [],
        },
        messages: [
          {
            id: 1,
            chatId: "channel-news789",
            senderId: 999,
            senderName: "Telegram News",
            content: "Breaking news update! 🚨 New features coming soon.",
            timestamp: "14:00",
            isOwn: false,
          },
        ],
      },
    },
  ];

export const useChat = (link: string) => {
  const [chat, setChat] = useState<IChat | null>(null);
  const [messages, setMessages] = useState<MessageList>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const data = mockData[link];
    if (data) {
      setChat(data.chat);
      setMessages(data.messages);
    } else {
      setChat(null);
      setMessages([]);
    }
    setLoading(false);
  }, [link]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !chat) return;

    setSending(true);

    const newMsg: IMessage = {
      id: Date.now(),
      chatId: link,
      senderId: 1, // current user
      senderName: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages((prev) => [newMsg, ...prev]);

    setSending(false);
  };

  return {
    chat,
    messages,
    loading,
    sendMessage,
    sending,
  };
};
