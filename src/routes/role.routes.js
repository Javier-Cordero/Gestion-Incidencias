import { Router } from 'express'
import RoleController from '../controllers/roles.controller.js'
const router = Router()
router.post('/', RoleController.postRole)
router.get('/', RoleController.getAll)
router.get('/:id', RoleController.getId)
router.patch('/:id', RoleController.patchRole)
router.delete('/:id', RoleController.deleteRole)
export default router
