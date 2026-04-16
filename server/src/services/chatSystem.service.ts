import { decode } from "jsonwebtoken";
import { JWTUserPayload } from "../types/token";
import ChatModel from "../models/Chat";
import { AppError } from "../types/error";
import { v4 as uuidv4 } from "uuid";
import database from "../config/database";
import { Op } from "sequelize";

export default class ChatSystemService {
  public static async createChat(
    jwt: any,
    type: string,
    name: string,
    participants: [],
    uniqueLink: string,
  ) {
    const user = decode(jwt) as JWTUserPayload;
    console.log(user, jwt, "token");

    if (!user) {
      throw new AppError("User was undefined while creating chat", 404);
    }

    const newChat = await ChatModel.create({
      creatorId: user.id,
      type: type,
      name: name,
      participants: participants,
      uniqueLink: uniqueLink ? uniqueLink : uuidv4(),
    });

    if (!newChat) {
      throw new AppError("Chat was not created", 500);
    }

    return newChat;
  }

  public static async openChatsByUserId(userId: number) {
    if (!userId) {
      throw new AppError("UserId parameter missing", 500);
    }

    const userChats = await ChatModel.findAll({
      where: {
        [Op.or]: [
          { creatorId: userId },
          database.where(
            database.cast(database.col("participants"), "JSONB"),
            "@>",
            `[${userId}]`,
          ),
        ],
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

  public static async deleteChat(link: any, userId: number) {
    console.log("Deleting chat:", link, "user:", userId);

    const chat = await ChatModel.findOne({ where: { uniqueLink: link } });
    if (!chat) throw new AppError("Chat not found", 404);
    if (chat.dataValues.creatorId !== userId)
      throw new AppError("Not chat creator", 403);

    await chat.destroy();
  }

  public static async updateChat() {}
}
