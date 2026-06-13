import express from 'express'
import { authMiddleware } from '../../../middleware/authMiddleware';
import ChatManagerController from '../../../controllers/chatManager.controller';
import ChatSystemController from '../../../controllers/chatSystem.controller';

const router = express.Router()

router.get('/user-chats', ChatSystemController.openChatsByUserId)
// router.get('/', authMiddleware, ChatManagerController.getUserChats)

export default router
