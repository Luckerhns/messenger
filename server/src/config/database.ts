import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const database = new Sequelize("messenger", "postgres", "Lucker007", {
  dialect: "postgres",
  port: +process.env.DB_PORT!,
  host: process.env.DB_HOST,
});

export default database;
