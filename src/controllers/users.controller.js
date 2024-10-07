import User from '../models/User.js'
export default class UserController {
  static async postUser(req, res) {
    try {
      const { name, lName, username, roleId, email, password } = req.body
      const image = req.file ? req.file.filename : 'uploads/1727604226180-perfil.jpg'
      if (!name || !lName || !username || !roleId || !email || !password || !image) return res.status(400).json({ message: 'complete los campos vacios' })
      const result = await User.create({ name, lName, username, roleId, email, password, image })
      res.status(201).json({ message: 'usuario creado', data: result })
    } catch (error) { res.status(500).json(error.message) }
  }

  static async getAll(req, res) {
    try {
      const result = await User.all()
      res.json(result)
    } catch (error) { res.status(500).json(error.message) }
  }

  static async getUserId(req, res) {
    try {
      const result = await User.byId(req.params.id)
      if (!result) return res.status(404).json({ message: 'usuario no encontrado' })
      res.json(result)
    } catch (error) { res.status(500).json(error.message) }
  }

  static async patchUser(req, res) {
    try {
      const { id } = req.params
      const { name, lName, roleId, email, password } = req.body
      const existe = await User.byId(id)
      if (!existe) return res.status(404).json({ message: 'usuario no existe' })
      const image = req.file ? req.file.filename : existe.image
      const user = await User.update({ id, name, lName, roleId, email, password, image })
      if (user.affectedRows === 0) return res.status(404).json({ message: 'usuario no actualizado' })
      res.json({ message: 'usuario actualizado', data: user })
    } catch (error) { res.status(500).json(error.message) }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params
      const user = await User.delete(id)
      if (!user) return res.status(404).json({ message: 'usuario no encontrado' })
      if (user.affectedRows === 0) return res.status(404).json({ message: 'usuario no eliminado' })
      res.json({ message: 'usuario eliminado' })
    } catch (error) { res.status(500).json(error.message) }
  }
}
