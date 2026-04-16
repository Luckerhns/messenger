"use client";

import React from 'react';
import ChatList from '@/components/chats/ChatList';
import SearchBar from '@/components/chats/SearchBar';
import NewChatButton from '@/components/chats/NewChatButton';

const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleNewChat = () => {
    console.log('New chat');
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
  };

  return (
    <div className="h-screen flex bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Left Sidebar - Chats List */}
      <div className="w-[420px] max-w-[420px] flex flex-col border-r border-gray-200 dark:border-gray-800 shrink-0 md:w-[380px]">
        <SearchBar onSearch={handleSearch} onNewChat={handleNewChat} />
        <div className="flex-1 overflow-hidden">
          <ChatList onChatSelect={handleChatSelect} />
        </div>
      </div>
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <div className="flex flex-col h-full">
            <div className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700 p-4 flex items-center shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  JD
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">John Doe</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">online</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-900/50">
              {/* Messages placeholder */}
              <div className="text-center text-gray-500 py-20">
                Start a conversation...
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shrink-0">
              <div className="flex items-end space-x-3">
                <input 
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Type a message..."
                />
                <button className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center">
                  ➤
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12 text-center">
            <div>
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                ✉
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No chat selected</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Choose a chat or start a new conversation</p>
              <NewChatButton onClick={handleNewChat} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;

