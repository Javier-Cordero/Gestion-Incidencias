import { pool } from '../config/db.js'
import Details from './Details.js'
export default class Report {
  static async create({ userId, type, description, image, fecha }) {
    try {
      const obligatories = ['userId', 'type', 'description', 'fecha']
      const save = [userId, type, description, fecha]
      if (image) {
        obligatories.push('image')
        save.push(image)
      }
      const campo = obligatories.join(', ')
      const placeholder = obligatories.map(() => '?').join(', ')
      const query = `INSERT INTO reports (${campo}) VALUES (${placeholder})`
      const [result] = await pool.execute(query, save)
      const newReportId = result.insertId
      await Details.create({ reportId: newReportId, stateId: 1, userId: null, description: null, fecha: null })
      return result
    } catch (error) { return { message: error.message } }
  }

  static async all() {
    try {
      const [result] = await pool.execute('SELECT r.reportId, u.username, r.type, r.description, r.image, r.fecha FROM reports r INNER JOIN users u ON r.userId = u.userId')
      return result
    } catch (error) { return { message: error.message } }
  }

  static async byId(id) {
    try {
      const [result] = await pool.execute('SELECT r.reportId, u.username, r.type, r.description, r.image, r.fecha FROM reports r INNER JOIN users u ON r.userId = u.userId WHERE reportId =?', [id])
      return result
    } catch (error) { return { message: error.message } }
  }

  static async update({ id, type, description, image, fecha }) {
    try {
      let query = 'UPDATE reports SET '
      const campo = []
      const valor = []
      if (type) {
        campo.push('type =?')
        valor.push(type)
      }
      if (description) {
        campo.push('description =?')
        valor.push(description)
      }
      if (image) {
        campo.push('image =?')
        valor.push(image)
      }
      if (fecha) {
        campo.push('fecha =?')
        valor.push(fecha)
      }
      if (campo.length === 0) return undefined
      query += campo.join(', ') + ' WHERE reportId = ?'
      valor.push(id)
      const [result] = await pool.execute(query, valor)
      if (result.affectedRows === 0) return { status: 400, message: 'No se pudo actualizar el reporte. Verifica el ID.' }
      return result
    } catch (error) { return { message: error.message } }
  }

  static async delete(id) {
    try {
      const rs = await Details.delete(id)
      const [result] = await pool.execute('DELETE FROM reports WHERE reportId =?', [id])
      return { reporte: result, rs }
    } catch (error) { return { message: error.message } }
  }
}
