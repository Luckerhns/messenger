

export type RoutesArrayType = IRoute[];

export enum publicRoutesEnum {
  REGISTER_ROUTE = "/api/public/register",
  LOGIN_ROUTE = "/api/public/login",
}

export enum privateRoutesEnum {
  CHATS_ROUTE = "/api/private/chats",
  CHAT_ROUTE = "/api/private/chats/",
}

export type { IChat, ChatList, IMessage, MessageList } from '../types/chat';


