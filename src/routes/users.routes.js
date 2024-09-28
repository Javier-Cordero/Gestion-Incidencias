import { Router } from 'express'
import UserController from '../controllers/Users.controller.js'
const router = Router()
router.get('/', UserController.getAll)
router.post('/', UserController.postUser)
router.get('/:id', UserController.getUserId)
router.patch('/:id', UserController.patchUser)
router.delete('/:id', UserController.deleteUser)
export default router
