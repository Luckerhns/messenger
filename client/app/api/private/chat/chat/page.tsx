"use client"

import React from 'react';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MessageCircle, Phone, Video, Paperclip, Send, Smile, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { useChat } from '@/hooks/useChat';

const ChatPage = () => {
  const params = useParams();
  const link = params?.link as string;
  const { chat, messages, loading, sendMessage, sending } = useChat(link || '');

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
  }

  if (!chat) {
    return <div className="flex items-center justify-center h-screen">Chat not found</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
            {chat.avatar ? (
              <Image src={chat.avatar} alt={chat.name} className="w-full h-full rounded-full object-cover" width={40} height={40} />
            ) : (
              chat.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-sm truncate">{chat.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">online</p>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.isOwn ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow',
                message.isOwn
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-white dark:bg-gray-800 rounded-bl-none border'
              )}
            >
              {message.isFile ? (
                <div className="space-y-2">
                  <div className="w-48 h-32 bg-gray-200 rounded-lg overflow-hidden relative">
                    <Image
                      src={message.fileUrl || '/placeholder.jpg'}
                      alt={message.content}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-500 truncate">{message.content}</p>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}
              <p className="text-xs opacity-75 mt-1 text-right">{message.timestamp}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-end space-x-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Smile className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 min-h-[44px] max-h-32 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-3xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 dark:bg-gray-700 placeholder-gray-500"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="p-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 rounded-full transition-colors flex items-center justify-center"
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

export default ChatPage;
