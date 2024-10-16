import { pool } from '../config/db.js'
export default class Details {
  static async create({ reportId, stateId, userId, description, fecha }) {
    try {
      const [result] = await pool.execute('INSERT INTO details (reportId, stateId, userId, description, fecha) VALUES (?, ?, ?, ?, ?)', [reportId, stateId, userId, description, fecha])
      return result
    } catch (error) { return { message: error.message } }
  }

  static async all() {
    try {
      const [result] = await pool.execute('SELECT d.detailsId, r.type as problema, s.name as estado, u.name as encargado, d.description, d.fecha FROM details d INNER JOIN reports r ON d.reportId=r.reportId INNER JOIN states s ON d.stateId=s.stateId INNER JOIN users u ON d.userId=u.userId')
      return result
    } catch (error) { return { message: error.message } }
  }

  static async byId(id) {
    try {
      const [result] = await pool.execute('SELECT d.detailsId, r.type as problema, s.name as estado, u.name as encargado, d.description, d.fecha FROM details d INNER JOIN reports r ON d.reportId=r.reportId INNER JOIN states s ON d.stateId=s.stateId INNER JOIN users u ON d.userId=u.userId WHERE detailId =?', [id])
      return result
    } catch (error) { return { message: error.message } }
  }

  static async update({ id, reportId, stateId, userId, description, fecha }) {
    try {
      const [result] = await pool.execute('UPDATE details SET reportId =?, stateId = ?, userId = ?, description = ? fecha = ? WHERE detailId =?', [reportId, stateId, userId, description, fecha, id])
      return result
    } catch (error) { return { message: error.message } }
  }

  static async delete(id) {
    try {
      const [result] = await pool.execute('DELETE FROM details WHERE detailId =?', [id])
      return result
    } catch (error) { return { message: error.message } }
  }
}
