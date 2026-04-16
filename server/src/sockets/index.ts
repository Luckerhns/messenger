import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import UserService from "../services/user.service";
import { AppError } from "../types/error";

const box = new Map()
export const setupSockets = (wss: WebSocketServer) => {
  wss.on("connection", (ws) => {
    console.log("Клиент подключился");
    ws.on("message", (e) => {
      console.log(e.toString("utf8"));
    });
  });
  wss.on("error", (e) => {
    console.log(e, "error");
  });
};
