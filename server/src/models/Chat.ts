import database from "../config/database";
import { DataTypes } from "sequelize";
import UserModel from "./User";

const ChatModel = database.define("Chat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.ENUM("private", "public", "channel"),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  participants: {
    type: DataTypes.JSON, // Array of user IDs
    defaultValue: [],
  },
  creatorId: {
    // Normalized from diagram "creator: User.id"
    type: DataTypes.INTEGER,
    references: { model: UserModel, key: "id" },
  },
  uniqueLink: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export default ChatModel;
