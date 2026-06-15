"use client"

import { useChatsStore } from "@/store/chatsStore";
import type { IChat } from "@/types/chat";

export const useSelectChat = () => {
  const chats = useChatsStore(state => state.chats);
  const selectedChat = useChatsStore(state => state.activeChat);
  const selectChatInStore = useChatsStore(state => state.selectChat);

  const selectChat = (chatLink: string) => {
    (chats.Chat, "CHATS")
    const chat = chats.find(c => c.Chat.uniqueLink === chatLink) || null;
    selectChatInStore(chat);
    console.log("Selected chat:", chat);
  };

  const clearSelectedChat = () => selectChatInStore(null);

  return {
    selectedChat,
    selectChat,
    clearSelectedChat
  };
};
