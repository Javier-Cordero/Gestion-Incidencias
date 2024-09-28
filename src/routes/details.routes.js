import { Router } from 'express'
import DetailController from '../controllers/details.controller.js'
const router = Router()
router.post('/', DetailController.postDetail)
router.get('/', DetailController.getAll)
router.get('/:id', DetailController.getId)
router.patch('/:id', DetailController.patchDetail)
router.delete('/:id', DetailController.deleteDetail)
export default router
