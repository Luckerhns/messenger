import database from "../config/database";
import { DataTypes } from "sequelize";
import UserModel from "./User";
import ChatModel from "./Chat";

const MessageModel = database.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: ChatModel, key: "id" },
      onDelete: "CASCADE",
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: UserModel, key: "id" },
      onDelete: "CASCADE",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("text", "image", "file", "audio", "video"),
      allowNull: false,
      defaultValue: "text",
    },
    replyTo: {
      type: DataTypes.BIGINT,
      allowNull: true,
      onDelete: "SET NULL",
    },
    editedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "messages",
    timestamps: true,
    indexes: [
      { fields: ["chatId", "createdAt"], name: "idx_messages_chat_created" },
      { fields: ["senderId"], name: "idx_messages_sender_id" },
    ],
  },
);

export default MessageModel;
