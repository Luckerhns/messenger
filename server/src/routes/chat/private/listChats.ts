import express from 'express'
import { authMiddleware } from '../../../middleware/authMiddleware';
import ChatManagerController from '../../../controllers/chatManager.controller';

const router = express.Router()

router.get('/', authMiddleware, ChatManagerController.getUserChats)

export default router
