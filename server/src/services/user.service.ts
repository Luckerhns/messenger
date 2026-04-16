import dotenv from "dotenv";
dotenv.config();
import jwt, { decode } from "jsonwebtoken";
import { IUser } from "./../types/user.d";
import UserModel from "../models/User";
import { hash, compare } from "bcrypt";
import { AppError } from "../types/error";
import { JWTUserPayload } from "../types/token";
import ChatSystemService from "./chatSystem.service";

export default class UserService {
  private static async checkPassword(password: string): Promise<string | true> {
    if (!password || typeof password !== "string") return "Password required";
    if (password.length < 8) return "Min 8 characters";
    if (!/[A-Z]/.test(password)) return "At least one uppercase letter";
    if (!/[a-z]/.test(password)) return "At least one lowercase letter";
    if (!/[0-9]/.test(password)) return "At least one number";
    if (!/[!@#$%^&*_]/.test(password)) return "At least one special char";
    return true;
  }
  public static async registration(phone: string, password: string) {
    const candidate = await UserModel.findOne({
      where: { phone: phone },
    });

    if (candidate) {
      throw new AppError(`User with phone ${phone} alredy exists`, 409);
    }

    // Check password
    const passwordValidation = await this.checkPassword(password);
    if (passwordValidation !== true) {
      throw new AppError(passwordValidation, 400);
    }

    const hashPassword = await hash(password, 10);

    const user = await UserModel.create({
      phone,
      passwordHash: hashPassword,
    });

    const token = jwt.sign(
      { id: user.dataValues.id, phone },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    console.log("User was created!");

    return {
      user: user.dataValues,
      token,
    };
  }

  public static async login(phone: string, password: string) {
    const user = await UserModel.findOne({ where: { phone } });
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }
    // console.log('gg')
    const userId = user.dataValues.id
    // Update Status
    const updatedStatus = UserService.setUserStatus(user.dataValues.id, "online");

    const userChats = await ChatSystemService.openChatsByUserId(userId)
    
    const hashPassword = user.getDataValue("passwordHash") as string;
    
    const isValidPassword = await compare(password, hashPassword);

    if (!isValidPassword) {
      throw new AppError("Invalid password", 401);
    }
    const token = jwt.sign(
      { id: user.dataValues.id, phone },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );
    return {
      user: user.dataValues,
      token,
      chats: userChats
    };
  }

  public static async logout(jwt: any) {
    const decoded = decode(jwt) as JWTUserPayload;
    console.log(decoded);

    if (!decoded || typeof decoded.id !== "number") {
      throw new AppError("Invalid token - no valid user ID", 401);
    }

    const user = await UserModel.findByPk(decoded.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    await user.update({
      status: "offline",
      lastseen: new Date(),
    });

    console.log(`User ${decoded.id} set to offline`);

    return {
      message: "Logged out successfully",
      userId: decoded.id,
    };
  }

  public static async setUserStatus(
    userId: number,
    status: "online" | "offline" | "away",
  ): Promise<void> {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    await user.update({
      status,
      ...(status === "offline" && { lastseen: new Date() }),
    });
  }

  public static async getOnlineUsers() {
    return UserModel.findAll({
      where: { status: "online" },
      attributes: [
        "id",
        "username",
        "firstname",
        "lastname",
        "avatar",
        "status",
      ],
    });
  }

  // public static async blackListService() {}
}
