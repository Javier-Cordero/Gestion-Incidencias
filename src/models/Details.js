import { pool } from '../config/db.js'
export default class Details {
  static async create ({ reportId, stateId, description }) {
    try {
      const detail = await pool.execute('INSERT INTO details (report_id, state_id, description) VALUES (?, ?, ?)', [reportId, stateId, description])
      return detail
    } catch (error) { console.error(error.message) }
  }

  static async all () {
    try {
      const [details] = await pool.execute('SELECT * FROM details')
      return details
    } catch (error) { console.error(error.message) }
  }

  static async byId (id) {
    try {
      const [detail] = await pool.execute('SELECT * FROM details WHERE detail_id =?', [id])
      return detail
    } catch (error) { console.error(error.message) }
  }

  static async update ({ id, reportId, stateId, description }) {
    try {
      const detail = await pool.execute('UPDATE details SET report_id =?, state_id =?, description =? WHERE detail_id =?', [reportId, stateId, description, id])
      return detail
    } catch (error) { console.error(error.message) }
  }

  static async delete (id) {
    try {
      const detail = await pool.execute('DELETE FROM details WHERE detail_id =?', [id])
      return detail
    } catch (error) { console.error(error.message) }
  }
}
