import { decode } from "jsonwebtoken";
import { JWTUserPayload } from "../types/token";
import ChatModel from "../models/Chat";
import { AppError } from "../types/error";
import { v4 as uuidv4 } from "uuid";
import database from "../config/database";
import { Op } from "sequelize";
import SnowflakeGenerator from "../utils/snowflake";

// User open and td with chat

export default class ChatSystemService {
  public static async createChat(chatData: any, userId: number) {
    if (!userId) {
      throw new AppError("User was undefined while creating chat", 404);
    }

    const { type, name, uniqueLink } = chatData;
    const snowflake = new SnowflakeGenerator(1);

    // Проверка на чат по активной ссылке

    if (uniqueLink.length > 0) {
      const isExistChat = await ChatModel.findOne({
        where: { uniqueLink: uniqueLink },
      });
      if (isExistChat) {
        throw new AppError("That link is alredy exists", 409);
      }
    }
    const newChat = await ChatModel.create({
      id: snowflake.generate(),
      creatorId: userId,
      type: type,
      name: name,
      uniqueLink: uniqueLink && uniqueLink.length > 0 ? uniqueLink : uuidv4(),
    });

    if (!newChat) {
      throw new AppError("Chat was not created", 500);
    }

    return newChat;
  }

  // User chat by id

  public static async openChatsByUserId(userId: any) {
    if (!userId) {
      throw new AppError("UserId parameter missing", 500);
    }

    const userChats = await ChatModel.findAll({
      where: {
        creatorId: userId,
      },
    });
    if (!userChats) throw new AppError("Chats was undefined", 404);

    return userChats;
  }

  public static async openChatByLink(link: string) {
    if (!link) throw new AppError("Link parameter missing", 400);
    console.log("Opening chat by link:", link);

    const chat = await ChatModel.findOne({
      where: { uniqueLink: link },
    });

    if (!chat) {
      throw new AppError("Chat not found", 404);
    }

    return chat;
  }

  public static async deleteChat(chatLink: any, userId: number) {
    console.log("Deleting chat:", chatLink, "user:", userId);

    const chat = await ChatModel.findOne({ where: { uniqueLink: chatLink } });
    if (!chat) throw new AppError("Chat not found", 404);
    if (chat.dataValues.creatorId !== userId)
      throw new AppError("Not chat creator", 403);

    await chat.destroy();
  }

  public static async updateChat() {}
}
