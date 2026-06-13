import database from "../config/database";
import { DataTypes } from "sequelize";
import UserModel from "./User";

const ChatModel = database.define(
  "Chat",
  {
    id: {
      type: DataTypes.BIGINT,
      defaultValue: DataTypes.BIGINT,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("private", "public", "channel"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    uniqueLink: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
  },
  {
    tableName: "chats",
    timestamps: true,
    indexes: [
      {
        fields: ["creatorId"],
        name: "idx_chats_creator_id",
      },
      {
        fields: ["uniqueLink"],
        name: "idx_chats_unique_link",
        unique: true,
      },
    ],
  },
);

export default ChatModel;
