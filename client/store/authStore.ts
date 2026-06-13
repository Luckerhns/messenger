import { create } from "zustand";
import { withPersists } from "./middlewares/persist";
import type { AuthState } from "./types";
import { authLogin, authRegister } from "@/http/userHttp";

interface AuthActions {
  login: (data: { phone: string; password: string }) => Promise<void>;
  register: (data: { phone: string; password: string }) => Promise<void>;
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
    errorState: async (data) => {
      set({ error: data });
    },
    login: async (data) => {
      set({ isLoading: true, error: null });
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
      } catch (err) {
        const message = err instanceof Error ? err.message : "Ошибка авторизации";
        set({ error: message, isLoading: false, isAuthenticated: false });
        throw err;
      }
    },
    register: async (data) => {
      set({ isLoading: true, error: null });
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
      } catch (err: any) {
        const message = err?.message || "Ошибка регистрации";
        set({ error: message, isLoading: false, isAuthenticated: false });
        throw err;
      }
    },
    logout: () => {
      set(initialState);
    },
  }),
  "auth-storage",
);

