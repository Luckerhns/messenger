"use client";

import { initSocket } from "@/lib/socket";
import { useMessagesStore } from "@/store/messagesStore";
import { useState, useEffect, useCallback, useRef } from "react";
const socketURL = "ws://localhost:5001";

type MessageNewPayload = {
  chatId: string;
  message: string | object;
  senderId: string;
  timestamp: string;
};

type SocketMessageNew = {
  type: "message:new";
  payload: MessageNewPayload;
};

type SocketError = {
  type: "error";
  payload?: { message?: string };
};

type Incoming = SocketMessageNew | SocketError;

export const useWebSocket = (chatId: string, userId: string) => {
  const { addMessage } = useMessagesStore();
  const socketRef = useRef<WebSocket | null>(null);

  const [lastMessage, setLastMessage] = useState<MessageNewPayload | null>(
    null,
  );
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ws = initSocket();
    socketRef.current = ws;

    ws.addEventListener("open", () => {
      console.log("WebSocket connected to:", socketURL);
      setIsConnected(true);
      setError(null);

      ws.send(
        JSON.stringify({
          type: "auth",
          userId,
          chatId,
        }),
      );
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      socketRef.current = null;
    });

    ws.addEventListener("error", (err) => {
      console.error("WebSocket error:", err);
      setError(err instanceof Error ? err : new Error("WebSocket error"));
    });

    ws.addEventListener("message", (e) => {
      try {
        const data = JSON.parse(e.data) as Incoming;
        console.log("Raw message from socket:", data);
        
        console.log("Raw message from socket:", data);
        console.log(addMessage('mamed', data.payload))
        if (data.type === "message:new") {
          if (data.payload.chatId === chatId) {
          }
          return;
        }

        if (data.type === "error") {
          setError(new Error(data.payload?.message ?? "Socket error"));
        }
      } catch (err) {
        console.error("Error parsing socket message:", err, e.data);
        setError(err instanceof Error ? err : new Error("Bad socket message"));
      }
    });

    return () => {
      ws.close();
    };
  }, [chatId, userId]);

  const sendMessage = useCallback(
    (message: string | object): boolean => {
      const socket = socketRef.current;
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.warn("WebSocket not connected. Message not sent:", message);
        return false;
      }

      const payload = JSON.stringify({
        type: "sendMessage",
        message,
        chatId,
        userId: userId,
      });

      console.log("Sending message via WebSocket:", payload);
      socket.send(payload);
      return true;
    },
    [chatId, userId],
  );

  return { lastMessage, isConnected, error, sendMessage };
};
