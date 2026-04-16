import express from 'express'
import ChatSystemController from '../../../../controllers/chatSystem.controller'

const router = express.Router()

router.delete('/:link', ChatSystemController.deleteChat)

export default router 