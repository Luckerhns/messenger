import { NextFunction, Request, Response } from "express";
import ChatManagerService from "../services/chatManager.service";
import { AppError } from "../types/error";

export default class ChatManagerController {
  public static async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { link } = req.params;
      const { userId } = req.body;
      console.log("Controller addUser:", link, userId);

      const updatedChat = await ChatManagerService.addUserToChat(
        link,
        Number(userId),
      );
      res.json(updatedChat);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteUserFromChat(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {}

  public static async getUserChats(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {}
}
