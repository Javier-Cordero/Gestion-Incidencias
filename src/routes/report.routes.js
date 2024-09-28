import { Router } from 'express'
import ReportController from '../controllers/reports.controller.js'
const router = Router()
router.post('/', ReportController.postReport)
router.get('/', ReportController.getReport)
router.get('/:id', ReportController.reportId)
router.patch('/:id', ReportController.patchReport)
router.delete('/:id', ReportController.deleteReport)
export default router
