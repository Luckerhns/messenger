import express from "express";
import UserController from "../../controllers/user.controller";
import registerRouter from "./public/register";
import loginRouter from "./public/login";
import logoutRouter from './private/logout'
import { authMiddleware } from "../../middleware/authMiddleware";

const router = express.Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

export default router;
