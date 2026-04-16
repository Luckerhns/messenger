export interface IRoute {
  path: string;
}

export type RoutesArrayType = IRoute[];

export enum publicRoutesEnum {
  REGISTER_ROUTE = "/api/public/auth/register",
  LOGIN_ROUTE = "/api/public/auth/login",
}

export enum privateRoutesEnum {
  CHATS_ROUTE = "/api/private/chats",
  CHAT_ROUTE = "/api/private/chats/chat",
}

