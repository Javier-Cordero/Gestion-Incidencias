import { Router } from 'express'
import upload from '../middlewares/multer.middleware.js'
const router = Router()
router.post('/', upload.single('image'), (req, res) => {
  console.log('Archivo recibido:', req.file)
  if (!req.file) res.status(400).send('no se pudo subir la imagen')
  res.send('imagen subida correctamente')
})

export default router
