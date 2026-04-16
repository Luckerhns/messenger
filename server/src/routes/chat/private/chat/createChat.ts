import express from 'express'
import ChatSystemController from '../../../../controllers/chatSystem.controller'

const router = express.Router()

router.post('/', ChatSystemController.createChat)

export default router