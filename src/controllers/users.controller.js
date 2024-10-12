import User from '../models/User.js';
import bcrypt from 'bcrypt';

export default class UserController {
  static async postUser(req, res) {
    try {
      const { name, lName, username, roleId, email, password } = req.body;
      const image = req.file ? req.file.filename : 'uploads/default-profile.jpg';
      if (!name || !lName || !username || !roleId || !email || !password) return res.status(400).json({ success: false, message: 'Complete los campos vacíos' });
      const hashpw = await bcrypt.hash(password, 10);
      const result = await User.create({ name, lName, username, roleId, email, password: hashpw, image });
      res.status(201).json({ data: result });
    } catch (error) { res.status(500).json({ success: false, message: error.message }) }
  }

  static async getAll(req, res) {
    try {
      const result = await User.all();
      res.json({ data: result });
    } catch (error) { res.status(500).json({ success: false, message: error.message }) }
  }

  static async getUserId(req, res) {
    try {
      const result = await User.byId(req.params.id);
      if (!result) return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      res.json({ data: result });
    } catch (error) { res.status(500).json({ success: false, message: error.message }) }
  }

  static async patchUser(req, res) {
    try {
      const { id } = req.params;
      const { name, lName, roleId, email, password } = req.body;
      const existe = await User.byId(id);
      if (!existe) return res.status(404).json({ success: false, message: 'Usuario no existe' });
      const image = req.file ? req.file.filename : existe.image;
      const hashpw = password ? await bcrypt.hash(password, 10) : existe.password;
      const result = await User.update({ id, name, lName, roleId, email, password: hashpw, image });
      if (result.affectedRows === 0) { return res.status(404).json({ success: false, message: 'Usuario no actualizado' }) }
      res.json({ data: result });
    } catch (error) { res.status(500).json({ success: false, message: error.message }) }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await User.delete(id);
      if (!result) return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Usuario no eliminado' })
      res.json({ data: result });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
}
