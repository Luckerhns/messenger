import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import ChatSystemService from "../services/chatSystem.service";

export default class UserController {
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { phone, password } = req.body;
      const user = await UserService.registration(phone, password);

      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, password } = req.body;
      const user = await UserService.login(phone, password);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  public static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;
      const result = await UserService.logout(token);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  public static async deleteAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
    } catch (error) {
      next(error);
    }
  }

  public static async getOnlineUsers(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const users = await UserService.getOnlineUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}
