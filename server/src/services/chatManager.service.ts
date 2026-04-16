import ChatModel from "../models/Chat";
import UserModel from "../models/User";
import { AppError } from "../types/error";
import checkParticipants from "../utils/checkParticipants";

export default class ChatManagerService {
  public static async addUserToChat(chatLink: any, userId: number) {
    console.log('addUser service:', chatLink, userId);
    
    const chat = await ChatModel.findOne({ where: { uniqueLink: chatLink } });
    if (!chat) throw new AppError("Chat not found", 404);
    
    const user = await UserModel.findByPk(userId);
    if (!user) throw new AppError("User not found", 404);
    
    const participants = chat.dataValues.participants;
    const newPartisipantsSortedList = checkParticipants(participants, userId)
    // if (!Array.isArray(participants)) {
    //   chat.update({participants: []})
    // }
    // if (participants(userId)) {
    //   throw new AppError("User already a member", 400);
    // }
    console.log([...participants], userId);
    
    chat.update({participants: newPartisipantsSortedList})
    // chat.update({participants: [...participants, userId]});
    // await chat.save();
    
    return chat;
  }

  public static async deleteUserFromChat() {}
}

