import express from 'express';
import UserController from '../../controllers/user.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = express.Router();

router.get('/online', authMiddleware, UserController.getOnlineUsers);

export default router;

