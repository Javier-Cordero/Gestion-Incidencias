import validator from 'validator'
import { pool } from '../config/db.js'
import { hash } from 'bcrypt'
export default class User {
  static async create ({ name, lName, role, email, password, image }) {
    try {
      const obligatories = ['name', 'l_name', 'role', 'email', 'password']
      const { isEmail } = validator
      if (!isEmail(email)) throw new Error('Invalid email')
      const [existe] = await pool.execute('SELECT email FROM users WHERE email = ?', [email])
      if (existe.length > 0) throw new Error('Email already exists')
      if (password.length < 8 || !/[A-Z]/.test(password)) throw new Error('Invalid password')
      const encrypted = await hash(password, 10)
      const save = [name, lName, role, email, encrypted]
      if (image) {
        obligatories.push('image')
        save.push(image)
      }
      const campos = obligatories.join(', ')
      const placeholder = obligatories.map(() => '?').join(', ')
      const query = `INSERT INTO users(${campos}) VALUES(${placeholder})`
      const [result] = await pool.execute(query, save)
      if (result.affectedRows === 0) throw new Error('User not created')
      return result
    } catch (error) { console.error(error.message) }
  }

  static async all () {
    const [user] = await pool.execute('SELECT user_id, name, l_name, role, email, image FROM users')
    return user
  }

  static async byId (id) {
    const [user] = await pool.execute('SELECT user_id, name, l_name, role, email, image FROM users WHERE user_id =?', [id])
    return user
  }

  static async update ({ id, name, lName, role, email, password, image }) {
    try {
      let query = 'UPDATE users SET '
      const campo = []
      const valor = []
      if (name) {
        campo.push('name = ?')
        valor.push(name)
      }
      if (lName) {
        campo.push('l_name = ?')
        valor.push(lName)
      }
      if (role) {
        campo.push('role = ?')
        valor.push(role)
      }
      if (email) {
        const { isEmail } = validator
        if (!isEmail(email)) { throw new Error('Invalid email') }
        const [existe] = await pool.execute('SELECT email FROM users WHERE email = ? AND user_id <> ?', [email, id])
        if (existe.length > 0) { throw new Error('Email already exists') }
        campo.push('email = ?')
        valor.push(email)
      }
      if (password) {
        const encrypted = await hash(password, 10)
        campo.push('password = ?')
        valor.push(encrypted)
      }
      if (image) {
        campo.push('image = ?')
        valor.push(image)
      }
      if (campo.length === 0) return undefined
      query += campo.join(', ') + ' WHERE user_id = ?'
      valor.push(id)
      const [result] = await pool.execute(query, valor)
      if (result.affectedRows === 0) throw new Error('No se pudo actualizar el usuario. Verifica el ID.')
      return result
    } catch (error) { console.error('Error al actualizar usuario:', error.message) }
  }

  static async delete (id) {
    const [user] = await pool.execute('DELETE FROM users WHERE user_id =?', [id])
    return user
  }
}
