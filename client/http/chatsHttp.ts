import { $user } from "@/http";


export const getUserChats = async () => {
  const chats = await JSON.parse(localStorage.getItem("chats"));
  return chats
};
