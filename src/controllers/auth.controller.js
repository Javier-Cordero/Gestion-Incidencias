import User from '../models/User.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

export default class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) return res.status(400).json({ message: 'Complete los campos vacios' })
      const result = await User.byUser(username)
      if (!result.success) return res.status(404).json({ message: 'usuario incorrecto' })
      const usuario = result.data
      const esValido = await compare(password, usuario.password)
      if (!esValido) return res.status(400).json({ message: 'Contraseña incorrecta' })
      const token = jwt.sign({ userId: usuario.userId }, JWT_SECRET, { expiresIn: '1h' })
      res.json({ success: true, token, user: usuario })
    } catch (error) {
      console.error(error.message)
      res.status(500).json({ message: error.message })
    }
  }

  static async me(req, res) {
    try {
      const { password, ...userData } = req.user;
      res.json([userData]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

}
