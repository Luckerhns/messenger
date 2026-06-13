'use client'

import { useChatsStore } from "@/store/chatsStore"
import { createChat } from "@/http/chatsHttp"
import { useAuthStore } from "@/store/authStore"
import { useState } from "react"
import type { IChat } from "@/types/chat"

export const useNewChat = () => {
  const createChatStore = useChatsStore(state => state.createChat)
  const user = useAuthStore(state => state.user)
  
  const addNewChat = async (chatData: Omit<IChat, 'id' | 'lastMessage' | 'lastTime' | 'unreadCount' | 'participants'>) => {
    if (!user) return
    
    const newChat: IChat = {
      id: Date.now(), // temp
      name: chatData.name,
      type: chatData.type,
      avatar: '',
      lastMessage: '',
      lastTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unreadCount: 0,
      uniqueLink: chatData.uniqueLink,
      participants: [],
    }
    
    await createChatStore(chatData, user.id, user.token)
    return newChat
  }

  return { addNewChat }
}

