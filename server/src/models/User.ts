import database from "../config/database";
import { DataTypes } from "sequelize";

const UserModel = database.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    validate: { isEmail: true },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("online", "offline", "away"),
    defaultValue: "offline",
  },
  lastseen: {
    type: DataTypes.DATE,
  },
  preferences: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING,
  },
});

export default UserModel;
