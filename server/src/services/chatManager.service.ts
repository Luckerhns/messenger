import ChatModel from "../models/Chat";
import ChatParticipants from "../models/ChatParticipants";
import UserModel from "../models/User";
import { AppError } from "../types/error";
import checkParticipants from "../utils/checkParticipants";

// User crud Chat

export default class ChatManagerService {
  public static async addUserToChat(chatLink: any, userId: number) {
    console.log("addUser service:", chatLink, userId);

    const chat = await ChatModel.findOne({ where: { uniqueLink: chatLink } });
    if (!chat) throw new AppError("Chat not found", 404);

    const chatId = chat.dataValues.id;

    const user = await UserModel.findByPk(userId);
    if (!user) throw new AppError("User not found", 404);

    const isParticipantsExist = await ChatParticipants.findOne({
      where: {
        userId: userId,
        chatId: chatId,
      },
    });

    if (isParticipantsExist) {
      throw new AppError("Duplicate model in database", 409);
    }

    const newParticipant = await ChatParticipants.create({
      chatId: chatId,
      userId: userId,
    });

    return newParticipant;
  }

  public static async deleteUserFromChat(chatLink: string, userId: number) {

    const chat = await ChatModel.findOne({ where: { uniqueLink: chatLink } });
    if (!chat) throw new AppError("Chat not found", 404);

    const chatId = chat.dataValues.id;

    const participant = await ChatParticipants.findOne({
      where: { chatId: chatId, userId: userId },
    });

    if (!participant) {
      throw new AppError("This user not exist in database", 404);
    }
  }
}
