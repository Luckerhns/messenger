import express from 'express'
import AuthRouter from './auth'
import UserRouter from './user'
import ChatRouter from './chat'

const router = express.Router()

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/chat', ChatRouter)
export default router;
