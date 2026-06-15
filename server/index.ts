import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import database from "./src/config/database";
import UserModel from "./src/models/User";
import MessageModel from "./src/models/Message";
import ChatModel from "./src/models/Chat";
import errorHandler from "./src/middleware/errorHandler";
import mainRouter from "./src/routes";
import cors from "cors";

import { setupSockets } from "./src/sockets";
import ChatParticipants from "./src/models/ChatParticipants";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", mainRouter);
app.use(cors());
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});
app.use(errorHandler);

setupSockets(wss);

// Global error handlers to prevent crashes
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await database.authenticate();
    await database.sync({ alter: true});
    await ChatParticipants.sync({ alter: true});
    ChatModel.hasMany(ChatParticipants, {
      foreignKey: "chatId",
      as: "participantsDirect",
    });

    ChatParticipants.belongsTo(ChatModel, {
      foreignKey: "chatId",
    });
    server.listen(PORT, () => {
      console.log(`Messenger server running on port ${PORT}`);
    });
    console.log("ChatModel associations:", Object.keys(ChatModel.associations));
    console.log(
      "ChatParticipants associations:",
      Object.keys(ChatParticipants.associations),
    );
  } catch (error) {
    console.log(error, "Error in starting server!");
  }
};

setupSockets(wss);
start();
