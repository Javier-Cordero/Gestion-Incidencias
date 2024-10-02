import { Router } from 'express'
import ReportController from '../controllers/reports.controller.js'
import upload from '../middlewares/multer.middleware.js'
const router = Router()
router.post('/', upload.single('image'), ReportController.postReport)
router.get('/', ReportController.getReport)
router.get('/:id', ReportController.reportId)
router.patch('/:id', upload.single('image'), ReportController.patchReport)
router.delete('/:id', ReportController.deleteReport)
export default router
