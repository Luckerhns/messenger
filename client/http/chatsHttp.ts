import { $user } from "@/http";
import { IChat } from "@/types/chat";
import { useStore } from "zustand";

export const getUserChats = async (userId: string) => {
  const { data } = await $user.get(`/chat/chats/user-chats?userId=${userId}`);
  return data;
};

export const createChat = async (chatData: IChat, userId: number, token: string) => {
  const { data } = await $user.post("/chat/create-chat", {
    userId,
    token,
    chatData,
  });
  return data;
};
