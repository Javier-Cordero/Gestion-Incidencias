import multer from 'multer'
import fs from 'fs'
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir) },
  filename: function (req, file, cb) {
    const newName = `${Date.now()}-${file.originalname}`
    cb(null, newName)
  }
})
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml']
  if (tiposPermitidos.includes(file.mimetype)) cb(null, true)
  else cb(new Error('Solo se aceptan archivos de imagen'))
}
const upload = multer({ storage, fileFilter })
export default upload
