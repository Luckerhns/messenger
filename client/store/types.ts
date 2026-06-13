import type { IChat as Chat, IMessage as Message } from "@types/chat";
import type { User } from "@types/user"; // Adjust if client types exist

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
  isLoading: boolean;
  chats: Chat[];
}

export interface ChatsState {
  chats: Chat[];
  currentChatId: string | null;
  isLoading: boolean;
  error: string | null;
  activeChat: Chat | null;
}

export interface MessagesState {
  messages: Record<string, Message[]>; // chatId -> messages
  isSending: Record<string, boolean>;
}

export interface UIState {
  searchQuery: string;
  isModalOpen: boolean;
  modalType: "newChat" | "settings" | null;
  leftPanelView: "chats" | "contacts" | null;
}
