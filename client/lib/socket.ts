// lib/socket.ts
"use client";

const socketURL = "ws://localhost:5001";

let socket: WebSocket | null = null;

export const initSocket = (): WebSocket => {
  if (!socket) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      return socket;
    }
    socket = new WebSocket(socketURL);


    // socket.addEventListener("open", () => {
      
    //   console.log("WebSocket connected to:", socketURL);
    //   console.log("Current socket instance:", socket);
    //   console.trace("Connection initiated from:"); // Показывает стек вызовов
    // });

    // socket.addEventListener("close", () => {
    //   console.log("WebSocket disconnected");
    //   socket = null; // Сбрасываем, чтобы можно было переподключиться
    // });

    // socket.addEventListener("error", (err) => {
    //   console.error("WebSocket error:", err);
    //   socket = null; // Сбрасываем при ошибке
    // });

    // socket.addEventListener("message", (e) => {
    //   try {
    //     const parsedMessage = JSON.parse(e.data).payload;
    //     console.log(parsedMessage, "Message from socket!");
    //   } catch (error) {
    //     console.log(error, "Error while getting message from socket");
    //   }
    // });
  }

  return socket;
};

export const sendSocketMessage = (
  message: string | object,
  chatId: string,
  userId: string,
  type: string = "sendMessage",
): boolean => {
  try {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not connected. Message not sent:", message);
      return false;
    }

    const data = JSON.stringify({ type, message, chatId, userId });
    console.log(
      "Sending message via WebSocket:",
      data,
      "Chat:",
      chatId,
      "User:",
      userId,
    );

    socket.send(data);
    return true;
  } catch (error) {
    console.error("Failed to send message:", error);
    return false;
  }
};

export const closeSocket = (): void => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
