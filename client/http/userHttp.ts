import { $user } from "@/http";

const authLogin = async (data) => {
  const { phone, password } = data;
  const response = await $user.post("/auth/login", {
    phone,
    password,
  });
  const { user, token, chats } = response.data;
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("chats", JSON.stringify(chats));
};

const authRegister = async (data) => {
  const { phone, password } = data;
  const response = await $user.post("/auth/register", {
    phone,
    password,
  });
  const { user, token, chats } = JSON.parse(response.data);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("chats", JSON.stringify(chats));
};

export { authLogin, authRegister };
