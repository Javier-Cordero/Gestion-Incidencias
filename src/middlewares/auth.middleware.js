import jwt from 'jsonwebtoken' // Importar todo el módulo
import User from '../models/User.js'
import { JWT_SECRET } from '../config/config.js'

export default async function validateJWT(req, res, next) {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(400).json({ message: 'Se debe proveer un token' })
    const token = authorization.split(' ')[1]
    if (!token) return res.status(400).json({ message: 'Token invalido' })
    const decodificado = jwt.verify(token, JWT_SECRET)
    const user = await User.byId(decodificado.userId)
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })
    req.user = user
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return res.status(401).json({ message: 'Token expirado' })
    else if (error instanceof jwt.JsonWebTokenError) return res.status(401).json({ message: 'Token no válido' })
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}
