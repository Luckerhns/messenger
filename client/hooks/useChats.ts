"use client";

import { useAuthStore } from "@/store/authStore";
import { useChatsStore } from "@/store/chatsStore";
import { useEffect, useCallback } from "react";

export const useChats = () => {
  const chats = useChatsStore((state) => state.chats);
  const loading = useChatsStore((state) => state.isLoading);
  const setUserChatsAction = useChatsStore((state) => state.setUserChats);
  const authUser = useAuthStore((state) => state.user);
  const userId = authUser?.id;

  // Initial load: fetch chats once when userId becomes available
  useEffect(() => {
    if (!userId) return;
    if (chats.length === 0) {
      setUserChatsAction(userId);
    }
  }, [userId]);

  const refetch = useCallback(
    async (refetchUserId?: number) => {
      const targetUserId = refetchUserId ?? userId;
      if (!targetUserId) {
        console.warn("refetch called without userId");
        return;
      }
      await setUserChatsAction(targetUserId);
    },
    [userId, setUserChatsAction]
  );

  return {
    chats,
    loading,
    refetch,
  };
};

