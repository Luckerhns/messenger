import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import { AppError } from "../types/error";
import MessageModel from "../models/Message";
import ChatParticipants from "../models/ChatParticipants";

/**
 * Явно указываем тип WebSocket из библиотеки ws
 * key: userId, value: активный сокет этого пользователя
 */
const connections = new Map<string, WebSocket>();

export const setupSockets = (wss: WebSocketServer) => {
  wss.on("connection", (ws: WebSocket) => {
    console.log("Клиент подключился");
    
    // кто сейчас на этом ws-соединении
    let currentUserId: string | null = null;

    const sendError = (message: string, id?: string) => {
      ws.send(
        JSON.stringify({
          type: "error",
          payload: { message, id },
        }),
      );
    };

    const publishNewMessageToChat = async (args: {
      chatId: string;
      userId: string;
      message: string;
    }) => {
      const { chatId, userId, message } = args;

      const participants = await ChatParticipants.findAll({
        where: { chatId },
      });

      const recipientIds = participants
        .map((p) => p.dataValues.userId)
        .filter((id) => id !== userId);

      const messageToSend = {
        type: "message:new",
        payload: {
          chatId,
          message,
          userId,
          timestamp: new Date().toISOString(),
        },
      };

      recipientIds.forEach((recipientId) => {
        const recipientSocket = connections.get(recipientId);
        if (
          recipientSocket &&
          recipientSocket.readyState === WebSocket.OPEN
        ) {
          recipientSocket.send(JSON.stringify(messageToSend));
          console.log("Message sent to recipient", recipientId);
        }
      });

      console.log(
        `Сообщение из чата ${chatId} отправлено ${recipientIds.length} получателям`,
      );
    };

    ws.on("message", async (e) => {
      try {
        const parsedMessage = JSON.parse(e.toString("utf-8"));
        console.log("Socket message received:", parsedMessage);

        const { type, userId } = parsedMessage 
        // as {
        //   type?: string;
        //   chatId?: string;
        //   userId?: string;
        //   token?: string | null;
        //   message?: string;
        //   text?: string;
        // };

        connections.set(userId, ws);


        // 1) AUTH: клиент отправляет { type:"auth", token }
        // if (type === "auth") {
        //   try {
        //     const token = parsedMessage.token;

        //     if (!token) {
        //       sendError("No token provided");
        //       return;
        //     }

        //     const decoded = jwt.verify(
        //       token,
        //       process.env.JWT_SECRET as string,
        //     ) as { userId?: string };

        //     if (!decoded?.userId) {
        //       sendError("Invalid token: userId missing");
        //       return;
        //     }

        //     currentUserId = decoded.userId;
        
        //     ws.send(
          //       JSON.stringify({
            //         type: "auth:ok",
            //         payload: { userId: currentUserId },
            //       }),
            //     );
            
            //     console.log("User authorized on socket:", currentUserId);
            //   } catch (err) {
              //     sendError("Auth failed");
              //   }
              
              //   return;
              // }
              
              // 2) legacy: { type:"sendMessage", chatId, userId, message }

        if (type === "sendMessage") {
          console.log(parsedMessage, 'type send message', type)
          const chatId = parsedMessage.chatId;
          const senderId = parsedMessage.userId;
          const message = parsedMessage.message;

          if (!chatId || !senderId || typeof message !== "string") {
            sendError("Invalid sendMessage payload");
            return;
          }

          await publishNewMessageToChat({ chatId, userId: senderId, message });
          return;
        }

        // 3) current: { type:"message:create", chatId, text }

        // 4) optional: { type:"chat:join" }
        // Сейчас в вашей архитектуре чат/получатели берутся из таблицы ChatParticipants,
        // поэтому join можно игнорировать. Но оставим поддержку как no-op.
        if (type === "chat:join") {
          if (!currentUserId) {
            sendError("Not authorized: auth first");
            return;
          }
          return;
        }
      } catch (error) {
        console.warn("Ошибка обработки сообщения:", error);
        sendError("Bad request");
      }
    });

    ws.on("close", () => {
      if (currentUserId) {
        connections.delete(currentUserId);
        console.log(`Пользователь ${currentUserId} отключился`);
      }
    });
  });

  wss.on("error", (e) => {
    console.error("Ошибка WebSocket сервера:", e);
  });
};
