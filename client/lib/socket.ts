// lib/socket.ts
'use client'

const socketURL = 'ws://localhost:5001';

let socket: WebSocket | null = null;

export const initSocket = (): WebSocket => {
  if (!socket) {
    socket = new WebSocket(socketURL);

    socket.addEventListener('open', () => {
      console.log('WebSocket connected to:', socketURL);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket disconnected');
      socket = null; // Сбрасываем, чтобы можно было переподключиться
    });

    socket.addEventListener('error', (err) => {
      console.error('WebSocket error:', err);
      socket = null; // Сбрасываем при ошибке
    });
  }

  return socket;
};

export const sendSocketMessage = (
  message: string | object,
  chatId: string,
  userId: string
): boolean => {
  try {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected. Message not sent:', message);
      return false;
    }

    const data = typeof message === 'string' ? message : JSON.stringify(message);
    console.log('Sending message via WebSocket:', data, 'Chat:', chatId, 'User:', userId);

    socket.send(data);
    return true;
  } catch (error) {
    console.error('Failed to send message:', error);
    return false;
  }
};

export const closeSocket = (): void => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
