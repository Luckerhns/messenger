"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useChats } from '@/hooks/useChats';
import ChatItem from '@/components/chats/ChatItem';
import { useRouter } from 'next/navigation';
import { privateRoutesEnum } from '@/types/routes';

interface ChatListProps {
  onChatSelect: (chatId: string) => void;
  selectedChat?: string;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect, selectedChat }) => {
  const { chats, loading } = useChats(); 
  const router = useRouter();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  );

  console.log(chats)

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.length <= 0 ? (
        <div className="text-center p-12 text-gray-500">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No chats yet. Start a new conversation!</p>
        </div>
      ) : (
        chats.map((chat, index) => (
          <ChatItem
            key={chat.id ?? index}
            chat={chat}
            onClick={() => {
              router.push(privateRoutesEnum.CHAT_ROUTE);
              onChatSelect((chat.id ?? index).toString());
            }}
            selected={selectedChat === (chat.id ?? index).toString()}
          />
        ))
      )}
    </div>
  );
};

export default ChatList;
