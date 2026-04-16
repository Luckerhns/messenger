# Server Architecture: CRUD + Socket Controllers in One Project

## Recommended Directory Structure (TypeScript/Express + WebSocket/Socket.io)
For a **messenger app** like yours (User/Chat/Message models), use **feature-based modularity** with separate concerns.

```
server/
├── src/
│   ├── config/              # Configs
│   │   └── database.ts
│   ├── controllers/         # REST CRUD Controllers ONLY
│   │   ├── user.controller.ts     # POST /users/register, GET /users/:id
│   │   └── chat.controller.ts     # GET /chats, POST /chats/:id/messages (REST)
│   ├── sockets/             # Socket Event Handlers (NEW - Recommended)
│   │   └── chat.gateway.ts  # ws.on('joinChat'), 'sendMessage' -> DB + broadcast
│   │   └── user.gateway.ts  # on('setOnline') for status
│   ├── services/            # Business Logic (shared REST + Socket)
│   │   ├── user.service.ts
│   │   ├── chat.service.ts  # createChat(), getMessages()
│   │   └── message.service.ts
│   ├── routes/              # REST Routes
│   │   ├── index.ts
│   │   ├── auth/
│   │   ├── user/
│   │   └── chat/            # app.use('/api/chat', chatRouter)
│   ├── middleware/          # Auth, errorHandler
│   ├── models/              # Sequelize models
│   └── types/
├── index.ts                 # App bootstrap, wss = new WebSocketServer({server})
└── package.json
```

## Key Principles
1. **controllers/**: HTTP/REST CRUD (Express req/res).
2. **sockets/**: Real-time events. Import in index.ts: `setupSockets(wss)`.
3. **services/**: Reusable (e.g., chatService.sendMessage(userId, text) called from both).
4. **Feature folders alternative** (if prefer all-in-one per feature):
   ```
   features/
   └── chat/
       ├── chat.controller.ts   # REST
       ├── chat.gateway.ts      # Socket
       └── chat.service.ts
   ```

## Example Files
### sockets/chat.gateway.ts
```ts
import { WebSocket } from 'ws';
export const setupChatSocket = (wss: WebSocketServer) => {
  wss.on('connection', (ws: WebSocket, req) => {
    // Auth: verify JWT from query
    ws.on('joinChat', async (data) => {
      // chatService.addUserToChat(...)
      wss.to(room).emit('userJoined');
    });
    ws.on('sendMessage', async (data) => {
      // Save to DB + broadcast
      wss.to(chatId).emit('newMessage', msg);
    });
  });
};
```

### index.ts Update
```ts
import { setupChatSocket } from './src/sockets/chat.gateway';
setupChatSocket(wss);  // Instead of raw wss.on()
```

## Why This Works for Messenger
- **CRUD**: REST for history/fetch.
- **Socket**: Live chat, typing, online.
- **Scalable**: Add Redis pub/sub later.
- **Matches your project**: Builds on existing controllers/routes/services.

Run: `yarn add ws @types/ws` (if Socket.io, `socket.io`).

Copy-paste this structure into your project!
