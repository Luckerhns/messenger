"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useChatsStore } from "@/store/chatsStore";
import ChatItem from "@/components/chats/ChatItem";
import { useRouter } from "next/navigation";
import { privateRoutesEnum } from "@/types/routes";
import { useAuthStore } from "@/store/authStore";
import { useChats } from "@/hooks/useChats";
import { useSelectChat } from "@/hooks/useSelectChat";

interface ChatListProps {
  onChatSelect?: (chatId: string) => void;
  selectedChat?: string;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const { chats, loading, refetch } = useChats();
  const { selectChat } = useSelectChat();
  const router = useRouter();
  const userId = useAuthStore((state) => state.user?.id);

  (chats);

  const handleChatClick = (chatLink: string, chatId?: string) => {
    selectChat(chatLink);
    if (onChatSelect) {
      router.push(`/api/${userId}/chats/${chatId ? chatId : chatLink}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="chats-list-container relative flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800
     scrollbar-thumb-rounded scrollbar-w-2"
    >
      {chats.length === 0 ? (
        <div className="text-center p-12 text-gray-500">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No chats yet. Start a new conversation!</p>
        </div>
      ) : (
        chats.map((chat, index) => (
          <ChatItem
            chatLink={chat.Chat.uniqueLink}
            key={index}
            chat={chat.Chat}
            onClick={() =>
              handleChatClick(
                chat.Chat.uniqueLink?.toString() || "",
                chat.chatId?.toString(),
              )
            }
          />
        ))
      )}
    </div>
  );
};

export default ChatList;
