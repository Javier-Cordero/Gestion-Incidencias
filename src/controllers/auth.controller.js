import User from '../models/User.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config.js'

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body
      const usuario = await User.byUser(username)
      if (!usuario || usuario.length === 0) return res.status(404).json({ message: 'usuario incorrecto' })
      const esValido = await compare(password, usuario[0].password)
      if (!esValido) return res.status(400).json({ message: 'Contraseña incorrecta' })
      const token = jwt.sign({ userId: usuario[0].userId }, JWT_SECRET, { expiresIn: '1h' })
      res.json({ token, user: usuario[0] })
    } catch (error) { res.status(500).json({ message: error.message }) }
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

export default AuthController
