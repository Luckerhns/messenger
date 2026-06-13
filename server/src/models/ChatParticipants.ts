import { DataTypes } from "sequelize";
import database from "../config/database";
import ChatModel from "./Chat";
import MessageModel from "./Message";
import UserModel from "./User";

const ChatParticipants = database.define(
  "ChatParticipants",
  {
    chatId: {
      type: DataTypes.BIGINT,
      defaultValue: DataTypes.BIGINT,

      allowNull: false,
      primaryKey: true,
      references: { model: ChatModel, key: "id" },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: UserModel, key: "id" },
      onDelete: "CASCADE",
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.ENUM("admin", "moderator", "member"),
      defaultValue: "member",
    },
    lastReadMessageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: MessageModel, key: "id" },
    },
  },
  {
    tableName: "chat_participants",
    timestamps: false,
  },
);

export default ChatParticipants;
