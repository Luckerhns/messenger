import { create } from "zustand";
import { withPersists } from "./middlewares/persist";
import type { AuthState } from "./types";
import { authLogin, authRegister } from "@/http/userHttp";

interface AuthActions {
  login: (data) => Promise<void>;
  register: (data) => Promise<void>;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  isLoading: false,
  chats: [],
};

export const useAuthStore = withPersists<AuthStore>(
  (set, get) => ({
    ...initialState,
    login: async (data) => {
      set({ isLoading: true });
      try {
        const { user, token, chats } = await authLogin(data);
        set({
          user,
          token,
          chats,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.log(error, "Error in authorization");
        set({ error: "Ошибка при входе", isLoading: false });
        throw error;
      }
    },
    register: async (data) => {
      set({ isLoading: true });
      try {
        const { user, token, chats } = await authRegister(data);
        set({
          user,
          token,
          chats,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.log(error, "Error in authorization");
        set({ error: "Register failed", isLoading: false });
        throw error;
      }
    },
    logout: () => {
      set(initialState);
    },
  }),
  "auth-storage"
);
