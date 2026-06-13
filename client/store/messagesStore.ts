import { create } from 'zustand';
import { withPersists } from './middlewares/persist';
import type { IMessage, MessageList } from '../types/chat';
import type { MessagesState } from './types';

interface MessagesActions {
  setMessages: (chatId: string, messages: MessageList) => void;
  addMessage: (chatId: string, message: IMessage) => void;
  setSending: (chatId: string, sending: boolean) => void;
  clearMessages: (chatId: string) => void;
}

type MessagesStore = MessagesState & MessagesActions;

const initialState: MessagesState = {
  messages: {},
  isSending: {},
};

export const useMessagesStore = withPersists<MessagesStore>(
  (set, get) => ({
    ...initialState,
    setMessages: (chatId, messages) =>
      set((state) => ({
        messages: { ...state.messages, [chatId]: messages },
      })),
    addMessage: (chatId, message) =>
      set((state) => ({
        messages: {
          ...state.messages,
          [chatId]: [...(state.messages[chatId] || []), message],
        },
      })),
    setSending: (chatId, sending) =>
      set((state) => ({
        isSending: { ...state.isSending, [chatId]: sending },
      })),
    clearMessages: (chatId) =>
      set((state) => {
        const newMessages = { ...state.messages };
        delete newMessages[chatId];
        return { messages: newMessages };
      }),
  }),
  'messages-storage'
);

