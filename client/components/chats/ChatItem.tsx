import React from 'react';
import { ChevronRight, Phone, Video } from 'lucide-react';
import { IChat } from '@/types/chat';
import { cn } from '@/utils/cn';
import Image from 'next/image';

interface ChatItemProps {
  chat: IChat;
  onClick: () => void;
  selected?: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat, onClick, selected = false }) => {
  const avatarInitials = chat.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  const hasUnread = chat.unreadCount > 0;

  return (
    <div
      className={cn(
        'flex items-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800',
        selected && 'bg-blue-50 dark:bg-blue-900/20'
      )}
      onClick={onClick}
    >
      <div className="relative mr-4">
        {chat.avatar ? (
          <Image 
            src={chat.avatar} 
            alt={chat.name} 
            width={48}
            height={48}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
            {avatarInitials}
          </div>
        )}
        {hasUnread && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full flex items-center justify-center text-xs font-bold text-white">
            •
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{chat.lastTime}</span>
        </div>
        <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
        {chat.unreadCount > 0 && (
          <span className="inline-block px-2 py-1 bg-blue-500 text-white text-xs rounded-full mt-1 ml-auto">
            {chat.unreadCount}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Phone className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-500" />
        <Video className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-500" />
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default ChatItem;

