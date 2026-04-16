import express from 'express'
import ChatSystemController from '../../../controllers/chatSystem.controller'

const router = express.Router()

router.get('/', ChatSystemController.openChat)

export default router