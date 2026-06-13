import { Chat } from '@/types/chat';

export const mockChatsData: Chat[] = [
  {
    id: 1,
    name: "John Doe",
    type: "private",
    avatar: "https://i.pravatar.cc/40?img=1",
    lastMessage: "Hey, how are you?",
    lastTime: "14:30",
    unreadCount: 2,
    uniqueLink: "chat-abc123",
    participants: [1, 2],
  },
  {
    id: 2,
    name: "Work Group",
    type: "group",
    avatar: "https://i.pravatar.cc/40?img=2",
    lastMessage: "Meeting tomorrow at 10am 📅",
    lastTime: "Yesterday",
    unreadCount: 0,
    uniqueLink: "group-work456",
    participants: [1, 3, 4],
  },
  {
    id: 3,
    name: "Telegram News",
    type: "channel",
    lastMessage: "Breaking news...",
    lastTime: "2 min ago",
    unreadCount: 5,
    uniqueLink: "channel-news789",
    participants: [],
  },
];

