import { pool } from '../config/db.js'
export default class Role {
  static async create ({ name }) {
    try {
      const result = await pool.query('INSERT INTO roles (name) VALUES (?)', [name])
      return result
    } catch (error) { console.error(error.message) }
  }

  static async all () {
    try {
      const [result] = await pool.query('SELECT * FROM roles')
      return result
    } catch (error) { console.error(error.message) }
  }

  static async byId (id) {
    try {
      const result = await pool.query('SELECT * FROM roles WHERE roleId =?', [id])
      return result[0]
    } catch (error) { console.error(error.message) }
  }

  static async update ({ id, name }) {
    try {
      const result = await pool.query('UPDATE roles SET name =? WHERE roleId =?', [name, id])
      return result
    } catch (error) { console.error(error.message) }
  }

  static async delete (id) {
    try {
      const result = await pool.query('DELETE FROM roles WHERE roleId =?', [id])
      return result
    } catch (error) { console.error(error.message) }
  }
}
