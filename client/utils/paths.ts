import {
  privateRoutesEnum,
  publicRoutesEnum,
  RoutesArrayType,
} from "@/types/routes";

export const publicRoutes: RoutesArrayType = [
  publicRoutesEnum.LOGIN_ROUTE,
  publicRoutesEnum.REGISTER_ROUTE,
];
export const privateRoutes: RoutesArrayType = [
  privateRoutesEnum.CHATS_ROUTE,
  privateRoutesEnum.CHAT_ROUTE,
];
