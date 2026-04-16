"use client";
import { useState, useEffect } from "react";
import { Chat } from "@/types/chat";
import { privateRoutesEnum } from "@/types/routes";
import { $user } from "@/http";
import { getUserChats } from "@/http/chatsHttp";
import { useRouter } from "next/navigation";

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter()

  const fetchChats = async () => {
    try {
      setLoading(true);
      setError("");
      const chatsArray = await getUserChats()
      setChats(chatsArray || []);
      router.push(privateRoutesEnum.CHATS_ROUTE)
    } catch (err: any) {
      console.error("Fetch chats error:", err);
      setError(err.response?.data?.message || "Failed to load chats. Retry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { chats, loading, error, refetch: fetchChats };
};
