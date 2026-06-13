"use client";

import React, { useEffect, useState } from "react";
import ChatList from "@/components/chats/ChatList";
import SearchBar from "@/components/chats/SearchBar";
import CreateChatModal from "@/components/chats/CreateChatModal";
import ChatWindow from "@/components/chats/ChatWindow";
import NewChatButton from "@/components/chats/NewChatButton";
import { useChats } from "@/hooks/useChats";
import { useChatsStore } from "@/store/chatsStore";
import { useSelectChat } from "@/hooks/useSelectChat";
import { useRouter } from "next/navigation";


const ChatsPage = ({params}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedChat, selectChat } = useSelectChat();
  const { chats, refetch } = useChats();
  const router = useRouter()
  // console.log(chat, "CHAT")
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleChatSelect = (chatId: string) => {
    router.push(`/api/${params.userId}/chats/${chatId}`);
    selectChat(chatId);
  };
  console.log("selected Chat", selectedChat);
  return (
    <div className="h-screen flex bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-[420px] max-w-[420px] flex flex-col border-r border-gray-200 dark:border-gray-800 shrink-0 md:w-[380px] relative">
        {/* <SearchBar onSearch={handleSearch} onNewChat={handleNewChat} /> */}
        <ChatList onChatSelect={handleChatSelect} />
        <NewChatButton />
      </div>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div>Открой чат!</div>
      </div>
    </div>
  );
};

export default ChatsPage;
