import { Router } from 'express'
import StateController from '../controllers/states.controller.js'
const router = Router()
router.post('/', StateController.postState)
router.get('/', StateController.getAll)
router.get('/:id', StateController.getId)
router.patch('/:id', StateController.patchState)
router.delete('/:id', StateController.deleteState)
export default router
