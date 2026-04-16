import express from 'express'
import ChatManagerController from '../../../../controllers/chatManager.controller'

const router = express.Router()

router.post('/members', ChatManagerController.addUser)

export default router