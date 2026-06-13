import { create } from "zustand";
import { withPersists } from "./middlewares/persist";
import type { IChat } from "../types/chat";
import type { ChatsState } from "./types";
import { createChat, getUserChats } from "@/http/chatsHttp";

interface ChatsActions {
  setUserChats: (userId: string | number) => Promise<void>;
  createChat: (chatData: IChat, userId: string | number, token: string) => Promise<void>;
  selectChat: (chat: IChat | null) => void;
  addChat: (chat: IChat) => void;
  removeChat: (chatId: string) => void;
  setCurrentChatId: (chatId: string | null) => void;
  setLoading: (loading: boolean) => void;
}

type ChatsStore = ChatsState & ChatsActions;

const initialState: ChatsState = {
  chats: [],
  currentChatId: null,
  isLoading: false,
  error: null,
  activeChat: null,
};

export const useChatsStore = withPersists<ChatsStore>(
  (set, get) => ({
    ...initialState,
    setUserChats: async (userId) => {
      set({ isLoading: true });
      try {
        const chats = await getUserChats(userId);
        console.log(chats, "Chats has been loaded")
        set({ chats: chats, isLoading: false, error: null });
      } catch (error) {
        set({ error: "Ошибка, не получилось подгрузить чаты", isLoading: false });
        console.log(error, "Error while loading chats");
      }
    },
    createChat: async (chatData, userId, token) => {
      set({ isLoading: true });
      try {
        const newChat = await createChat(chatData, userId, token);
        if (!newChat) {
          set((state) => ({
            error: "Ошибка, при создании чата!",
            isLoading: false,
            chats: [...state.chats],
          }));
        }
        set((state) => ({ chats: [...state.chats, newChat], isLoading: false }));
      } catch (error) {
        set({ error: "Ошибка при создании чата", isLoading: false });
      }
    },
    selectChat: (chat) => set({ activeChat: chat }),
    removeChat: (chatId) =>
      set((state) => ({
        chats: state.chats.filter((c) => c.id !== parseInt(chatId)),
      })),
    setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
    setLoading: (loading) => set({ isLoading: loading }),
  }),
  "chats-storage"
);
