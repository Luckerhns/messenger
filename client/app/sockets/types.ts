export interface ISocketMessage {
  senderId: number;
  content: string;
  chatId: number;
  type: IMessageType;
  replyTo?: bigint;
  editedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type IMessageType = "text" | "image" | "file" | "audio" | "video";

export type SocketEventHandler = (data: unknown) => void;
