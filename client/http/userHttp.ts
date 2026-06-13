import { $user } from "@/http";

const authLogin = async (data) => {
  const { phone, password } = data;
  const response = await $user.post("/auth/login", {
    phone,
    password,
  });

  const { user, token, chats } = response.data;

  return {user, token, chats}
};

const authRegister = async (data) => {
  const { phone, password } = data;
  const response = await $user.post("/auth/register", {
    phone,
    password,
  });
  const { user, token, chats } = response.data;
  
  return {user, token, chats}
};

export { authLogin, authRegister };

