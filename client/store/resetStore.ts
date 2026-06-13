import { useAuthStore } from './authStore';
import { useChatsStore } from './chatsStore';
import { useMessagesStore } from './messagesStore';
import { useUIStore } from './uiStore';

export type { AuthState, ChatsState, MessagesState, UIState } from './types';

export const resetAllStores = () => {
  useAuthStore.getState().logout();
  useChatsStore.getState().setUserChats([]);
  useMessagesStore.setState({ messages: {}, isSending: {} });
  useUIStore.setState({
    searchQuery: '',
    isModalOpen: false,
    modalType: null,
  });
};

// Re-export for convenience
export { useAuthStore, useChatsStore, useMessagesStore, useUIStore };

