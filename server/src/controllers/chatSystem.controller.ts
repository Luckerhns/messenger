import { NextFunction, Request, Response } from "express";
import ChatSystemService from "../services/chatSystem.service";
import { AppError } from "../types/error";

export default class ChatSystemController {
  public static async createChat(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { chatData, userId } = req.body;
      const currentUser = userId;
      const newChat = await ChatSystemService.createChat(chatData, userId);

      return res.status(201).json(newChat);
    } catch (error) {
      next(error);
    }
  }

  public static async openChatsByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = req.body ?? {};
      // GET /user-chats should receive userId via query or body; body may be undefined for GET.
      const userIdFromQuery = (req.query as any)?.userId;
      const resolvedUserId = userId ?? userIdFromQuery;

      if (!resolvedUserId) throw new AppError("UserId parameter missing", 400);

      // keep behavior consistent for the service layer
      const userChats = await ChatSystemService.openChatsByUserId(resolvedUserId as string);
      return res.status(200).json(userChats);

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
