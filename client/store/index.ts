import { useChatsStore } from "./chatsStore";
import { useAuthStore } from "./authStore";
// Export individual stores directly - use them instead of broken combined store
// useAppStore was incorrectly assigning hook function to state
