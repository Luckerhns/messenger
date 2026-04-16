import app from 'express'
import { authMiddleware } from '../../../middleware/authMiddleware'
import UserController from '../../../controllers/user.controller'

const router = app.Router()

// router.use(authMiddleware)
router.post('/', UserController.logout)

export default router