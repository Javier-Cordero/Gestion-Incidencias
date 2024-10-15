import validator from 'validator'
import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'
export default class User {
  static async create({ name, lName, username, roleId, email, password, image }) {
    try {
      const obligatories = ['name', 'lName', 'username', 'roleId', 'email', 'password', 'image']
      const { isEmail } = validator
      if (!isEmail(email)) return { status: 400, message: 'Invalid email' };
      const [existe] = await pool.execute('SELECT username, email FROM users WHERE (username = ? OR email = ?)', [username, email])
      if (existe.length > 0) {
        if (existe[0].username === username) return { status: 400, message: 'Username already exists' };
        if (existe[0].email === email) return { status: 400, message: 'Email already exists' };
      }
      if (password.length < 8 || !/[A-Z]/.test(password)) return { status: 400, message: 'Invalid password' };
      const encrypted = await bcrypt.hash(password, 10)
      const save = [name, lName, username, roleId, email, encrypted, image]
      const campos = obligatories.join(', ')
      const placeholder = obligatories.map(() => '?').join(', ')
      const query = `INSERT INTO users(${campos}) VALUES(${placeholder})`
      const [result] = await pool.execute(query, save)
      if (result.affectedRows === 0) return { status: 400, message: 'User not created' };
      return result
    } catch (error) { return { status: 500, message: error.message } }
  }

  static async all() {
    try {
      const [result] = await pool.execute('SELECT u.userId, u.name, u.lName, u.username, r.name as role, u.email, u.image FROM users u INNER JOIN roles r ON u.roleId = r.roleId')
      return result
    } catch (error) { return { message: error.message } }
  }

  static async byId(id) {
    try {
      const [result] = await pool.execute('SELECT u.userId, u.name, u.lName, u.username, r.name as role, u.email, u.image FROM users u INNER JOIN roles r ON u.roleId=r.roleId WHERE u.userId =?', [id])
      return result[0]
    } catch (error) { return { message: error.message }; }
  }

  static async byUser(username) {
    try {
      const [result] = await pool.execute('SELECT u.userId, u.name, u.lName, u.username, r.name as role, u.email, u.password, u.image FROM users u INNER JOIN roles r ON u.roleId = r.roleId WHERE u.username = ?', [username]);
      if (result.length === 0) return { success: false, message: 'usuario no encontrado' }
      return result[0]
    } catch (error) { return { message: error.message } }
  }

  static async update({ id, name, lName, username, roleId, email, password, image }) {
    try {
      let query = 'UPDATE users SET '
      const campo = []
      const valor = []
      if (name) {
        campo.push('name = ?')
        valor.push(name)
      }
      if (lName) {
        campo.push('lName = ?')
        valor.push(lName)
      }
      if (username) {
        const [existe] = await pool.execute('SELECT username FROM users WHERE username =? AND userId <>?', [username, id])
        if (existe.length > 0) return { status: 400, message: 'Username already exists' }
        campo.push('username =?')
        valor.push(username)
      }
      if (roleId) {
        campo.push('roleId = ?')
        valor.push(roleId)
      }
      if (email) {
        const { isEmail } = validator
        if (!isEmail(email)) return { status: 400, message: 'Invalid email' }
        const [existe] = await pool.execute('SELECT email FROM users WHERE email = ? AND userId <> ?', [email, id])
        if (existe.length > 0) return { status: 400, message: 'Email already exists' }
        campo.push('email = ?')
        valor.push(email)
      }
      if (password) {
        const encrypted = await bcrypt.hash(password, 10)
        campo.push('password = ?')
        valor.push(encrypted)
      }
      if (image) {
        campo.push('image = ?')
        valor.push(image)
      }
      if (campo.length === 0) return undefined
      query += campo.join(', ') + ' WHERE userId = ?'
      valor.push(id)
      const [result] = await pool.execute(query, valor)
      if (result.affectedRows === 0) return { status: 400, message: 'No se pudo actualizar el usuario. Verifica el ID.' }
      return result
    } catch (error) { return { message: error.message } }
  }

  static async delete(id) {
    try {
      const [result] = await pool.execute('DELETE FROM users WHERE userId =?', [id])
      return result
    } catch (error) { return { message: error.message } }
  }
}
