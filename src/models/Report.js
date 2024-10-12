import { pool } from '../config/db.js'
export default class Report {
  static async create({ userId, type, description, image }) {
    try {
      const obligatories = ['userId', 'type', 'description']
      const save = [userId, type, description]
      if (image) {
        obligatories.push('image')
        save.push(image)
      }
      const campo = obligatories.join(', ')
      const placeholder = obligatories.map(() => '?').join(', ')
      const query = `INSERT INTO reports (${campo}) VALUES (${placeholder})`
      const [result] = await pool.execute(query, save)
      return result
    } catch (error) { return { message: error.message } }
  }

  static async all() {
    try {
      const [report] = await pool.execute('SELECT r.reportId, u.username, r.type, r.description, r.image, r.fecha FROM reports r INNER JOIN users u ON r.userId = u.userId')
      return report
    } catch (error) { return { message: error.message } }
  }

  static async byId(id) {
    try {
      const [report] = await pool.execute('SELECT r.reportId, u.username, r.type, r.description, r.image, r.fecha FROM reports r INNER JOIN users u ON r.userId = u.userId WHERE reportId =?', [id])
      return report
    } catch (error) { return { message: error.message } }
  }

  static async update({ id, userId, type, description, image }) {
    try {
      let query = 'UPDATE reports SET '
      const campo = []
      const valor = []
      if (userId) {
        campo.push('userId =?')
        valor.push(userId)
      }
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
      if (campo.length === 0) return undefined
      query += campo.join(', ') + ' WHERE reportId = ?'
      valor.push(id)
      const [report] = await pool.execute(query, valor)
      if (report.affectedRows === 0) throw new Error('no se pudo actualizar el reporte')
      return report
    } catch (error) { return { message: error.message } }
  }

  static async delete(id) {
    try {
      const [report] = await pool.execute('DELETE FROM reports WHERE reportId =?', [id])
      return report
    } catch (error) { return { message: error.message } }
  }
}
