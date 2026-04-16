export interface IChat {
  id: number;
  name: string;
  type: 'private' | 'group' | 'channel';
  avatar?: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  uniqueLink: string;
  participants: number[];
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

