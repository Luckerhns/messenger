"use client";

import React, { Suspense } from "react";
import ChatList from "@/components/chats/ChatList";
import SearchBar from "@/components/chats/SearchBar";
import CreateChatModal from "@/components/chats/CreateChatModal";
import ChatWindow from "@/components/chats/ChatWindow";
import NewChatButton from "@/components/chats/NewChatButton";
import { useChats } from "@/hooks/useChats";
import { useChatsStore } from "@/store/chatsStore";
import { useSelectChat } from "@/hooks/useSelectChat";
import { useParams, useSearchParams } from "next/navigation";

const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { selectedChat, selectChat } = useSelectChat();
  const { chats } = useChats();
  const searchParams = useParams();
  
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const {userId, chatId} = searchParams;


  console.log(searchParams);

  const handleNewChat = () => {
    // console.log("New chat");
  };

  const { setUserChats } = useChatsStore();
  React.useEffect(() => {
    setUserChats(userId);
  }, [setUserChats]);

  const handleChatSelect = (chatId: string) => {
    selectChat(chatId);
  };
  // console.log("selected Chat", selectedChat);
  return (
    <Suspense>
      <div className="h-screen flex bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-[420px] max-w-[420px] flex flex-col border-r border-gray-200 dark:border-gray-800 shrink-0 md:w-[380px] relative">
          {/* <SearchBar onSearch={handleSearch} onNewChat={handleNewChat} /> */}
          <ChatList onChatSelect={handleChatSelect} />
          <NewChatButton />
        </div>
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">
            <ChatWindow chat={selectedChat || null} />
            <CreateChatModal />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ChatsPage;
