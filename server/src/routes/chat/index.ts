import express from "express";
import ChatSystemController from "../../controllers/chatSystem.controller";
import ChatManagerController from "../../controllers/chatManager.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import createRouter from './private/chat/createChat';
import deleteRouter from './private/chat/deleteChat'
import listChatsRouter from './private/listChats';

const router = express.Router();

router.use("/chats", listChatsRouter);
router.use("/create-chat", createRouter);
router.get('/:link', ChatSystemController.openChat);
router.post('/:link/members', authMiddleware, ChatManagerController.addUser);
router.use('/delete-chat', authMiddleware, deleteRouter);
router.use('/:link', deleteRouter)
// router.use('/delete-chat' deleteRouter)
// router.use('/update-chat', updateRouter)

export default router