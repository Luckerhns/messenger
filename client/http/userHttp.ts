import { $user } from "@/http";

const extractServerMessage = (err: unknown): string => {
  const message = err?.response?.data?.error?.message;
  if (typeof message === "string" && message.trim().length > 0) return message;

  const fallback = err?.message;
  if (typeof fallback === "string" && fallback.trim().length > 0) return fallback;

  return "Ошибка авторизации";
};

const authLogin = async (data: { phone: string; password: string }) => {
  try {
    const { phone, password } = data;
    const response = await $user.post("/auth/login", { phone, password });

    const { user, token, chats } = response.data;
    return { user, token, chats };
  } catch (err: any) {
    const message = extractServerMessage(err);
    throw new Error(message);
  }
};

const authRegister = async (data: { phone: string; password: string }) => {
  try {
    const { phone, password } = data;
    const response = await $user.post("/auth/register", { phone, password });

    const { user, token, chats } = response.data;
    return { user, token, chats };
  } catch (err: any) {
    const message = extractServerMessage(err);
    throw new Error(message);
  }
};

export { authLogin, authRegister };

