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
      res.status(201).json({ success: true, message: 'Usuario creado', data: result });
    } catch (error) {res.status(500).json({ success: false, message: error.message })}
  }

  static async getAll(req, res) {
    try {
      const result = await User.all();
      res.json({ success: true, data: result });
    } catch (error) {res.status(500).json({ success: false, message: error.message })}
  }

  static async getUserId(req, res) {
    try {
      const result = await User.byId(req.params.id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static async patchUser(req, res) {
    try {
      const { id } = req.params;
      const { name, lName, roleId, email, password } = req.body;
      const existe = await User.byId(id);
      if (!existe) return res.status(404).json({ success: false, message: 'Usuario no existe' });
      const image = req.file ? req.file.filename : existe.image;
      const hashpw = password ? await bcrypt.hash(password, 10) : existe.password;
      const user = await User.update({ id, name, lName, roleId, email, password: hashpw, image });
      if (user.affectedRows === 0) {return res.status(404).json({ success: false, message: 'Usuario no actualizado' })}
      res.json({ success: true, message: 'Usuario actualizado', data: user });
    } catch (error) {res.status(500).json({ success: false, message: error.message })}
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.delete(id);
      if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' })
      if (user.affectedRows === 0) return res.status(404).json({ success: false, message: 'Usuario no eliminado' })
      res.json({ success: true, message: 'Usuario eliminado' });
    } catch (error) {res.status(500).json({ success: false, message: error.message });}
  }
}
