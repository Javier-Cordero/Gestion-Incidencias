import { Router } from 'express'
import UserController from '../controllers/users.controller.js'
import upload from '../middlewares/multer.middleware.js'
const router = Router()
router.get('/', UserController.getAll)
router.post('/', upload.single('image'), UserController.postUser)
router.get('/:id', UserController.getUserId)
router.patch('/:id', upload.single('image'), UserController.patchUser)
router.delete('/:id', UserController.deleteUser)
export default router
