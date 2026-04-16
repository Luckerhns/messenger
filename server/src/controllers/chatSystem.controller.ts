import { NextFunction, Request, Response } from "express";
import ChatSystemService from "../services/chatSystem.service";

export default class ChatSystemController {
  public static async createChat(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { token, type, name, participants, link } = req.body;
      const newChat = ChatSystemService.createChat(
        token,
        type,
        name,
        participants,
        link,
      );

      return res.json(newChat);
    } catch (error) {
      next(error);
    }
  }

  public static async openChat(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { link } = req.params;
      console.log("Controller received link:", link, "params:", req.params);
      // const chat = await ChatSystemService.openChatByLink(link);

      // return res.json(chat);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteChat(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { link } = req.params;
      const currentUserId = (req as any).user.id;
      console.log(link);
      await ChatSystemService.deleteChat(link, currentUserId);
      res.json({ success: true, message: "Chat deleted" });
    } catch (error) {
      next(error);
    }
  }

  public static async updateChat(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {}
}
