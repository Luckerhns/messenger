import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import { AppError } from "../types/error";
import MessageModel from "../models/Message";

// const box = new Map();

// const addMessage = (message: any) => {
//   box.set(message.chatId, message);
// };

export const setupSockets = (wss: WebSocketServer) => {
  wss.on("connection", (ws) => {
    console.log("Клиент подключился");
    ws.on("message", (e) => {
      try {
        console.log("Socket info", e.toString("utf8"));

        // const readeble = JSON.parse(e.toString("utf-8"))
        // console.log(readeble, 'readable')
        // MessageModel
        // box.set({})
      } catch (error) {
        console.warn("Error while getting message from sockets");
      }
    });
  });
  wss.on("error", (e) => {
    console.log(e, "error");
  });
};
