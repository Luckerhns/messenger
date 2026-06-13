export interface IChat {
  id?: number;
  type: "private" | "group" | "channel";
  name: string;
  creatorId: number;
  uniqueLink?: string | null;
}

export type ChatList = IChat[];

export interface IMessage {
  id: number;
  chatId: string;
  senderId: number;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  isFile?: boolean;
  fileUrl?: string;
}

export type MessageList = IMessage[];
