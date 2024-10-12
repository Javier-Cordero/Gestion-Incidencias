import { pool } from '../config/db.js'
export default class State {
  static async create ({ name }) {
    try {
      const result = await pool.query('INSERT INTO states (name) VALUES (?)', [name])
      return result
    } catch (error) { return { message: error.message } }
  }

  static async all () {
    try {
      const [result] = await pool.query('SELECT * FROM states')
      return result
    } catch (error) { return { message: error.message } }
  }

  static async byId (id) {
    try {
      const result = await pool.query('SELECT * FROM states WHERE stateId =?', [id])
      return result[0]
    } catch (error) { return { message: error.message } }
  }

  static async update ({ id, name }) {
    try {
      const result = await pool.query('UPDATE states SET name =? WHERE stateId =?', [name, id])
      return result
    } catch (error) { return { message: error.message } }
  }

  static async delete (id) {
    try {
      const result = await pool.query('DELETE FROM states WHERE stateId =?', [id])
      return result
    } catch (error) { return { message: error.message } }
  }
}
