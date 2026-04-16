import database from "../config/database";
import { DataTypes } from "sequelize";
import UserModel from "./User";
import ChatModel from "./Chat";

const MessageModel = database.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chatId: {
    type: DataTypes.INTEGER,
    references: { model: ChatModel, key: "id" },
  },
  senderId: {
    type: DataTypes.INTEGER,
    references: { model: UserModel, key: "id" },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("text", "image", "file", "audio", "video"),
    allowNull: false,
  },
  replyTo: {
    type: DataTypes.INTEGER,
    references: { model: 'Message', key: "id" }, // Self-reply
  },
  readBy: {
    type: DataTypes.JSON, // Array of user IDs
    defaultValue: [],
  },
  editedAt: {
    type: DataTypes.DATE,
  },
});

export default MessageModel;
