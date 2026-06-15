"use client";

import React, { useState, useRef, useEffect } from "react";
import { Phone, Video, Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useMessagesStore } from "@/store/messagesStore";
import type { IChat, IMessage } from "@/types/chat";
import { openSocketConnection, socketClient } from "@/app/sockets";
import { useAuthStore } from "@/store/authStore";
import { useChatsStore } from "@/store/chatsStore";
import { useSelectChat } from "@/hooks/useSelectChat";
import AutoResizeTextarea from "../UI/AutoResizeTextarea";
import { useInputStore } from "@/store/inputStore";
import { initSocket, sendSocketMessage } from "@/lib/socket";
import { useWebSocket } from "@/hooks/useWebSocket";

interface ChatWindowProps {
  chat: IChat | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isSending, addMessage } = useMessagesStore();
  // const {isConnected} = useSocketHook()
  const chatMessages = chat ? messages[chat.uniqueLink] || [] : [];
  const sending = chat ? isSending[chat.uniqueLink] || false : false;
  const { user } = useAuthStore();
  const { selectedChat } = useSelectChat();
  const { inputValue, setInputValue } = useInputStore();

  const { lastMessage, error, isConnected } = useWebSocket();
  initSocket()
  const sendMessage = async () => {
    try {
      await sendSocketMessage(inputValue, chat.id, user.id);
      const newMessage = {
        type: "sendMessage",
        message: inputValue,
        chatId: chat?.id,
        userId: user.id,
      };
      console.log(chatMessages)
      addMessage(chat.uniqueLink, newMessage);
      setInputValue("");
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  if (!chat || chat === null) {
    return (
      <div className="flex-1 flex items-center justify-center p-12 text-center">
        <div>
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            ✉
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No chat selected
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Choose a chat or start a new conversation
          </p>
        </div>
      </div>
    );
  }

  // Full chat page (right panel)

  return (
    <div className="chat-window-container flex flex-col h-full ">
      {/* Header */}
      <div className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 p-4 flex items-center space-x-3 shrink-0">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
            {/* {chat.avatar ? (
              <Image
                src={chat.avatar}
                alt={chat.name}
                className="w-full h-full rounded-full object-cover"
                width={40}
                height={40}
              />
            ) : (
              chat.name.slice(0, 2).toUpperCase()
            )} */}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-gray-900 dark:text-white truncate">
              {chat.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {chat.type}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}

      <div className="chat-messages-container max-h-[calc(100vh-15vh)] flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
        {chatMessages.map((message, key) => (
          <div
            key={key}
            className={cn(
              "flex",
              message.userId === user.id ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow",
                message.isOwn
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white dark:bg-gray-800 rounded-bl-none border",
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.message}</p>
              <p className="text-xs opacity-75 mt-1 text-right">
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="chat-window-message-container p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Smile className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <AutoResizeTextarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
          />

          <button
            onClick={sendMessage}
            className="p-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 rounded-full transition-colors flex items-center justify-center w-10 h-10"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Send className="w-5 h-5 transform rotate-45" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
