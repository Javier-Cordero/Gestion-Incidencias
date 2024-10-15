import Report from '../models/Report.js'
export default class ReportController {
  static async postReport(req, res) {
    try {
      const { type, description, fecha } = req.body
      const {userId} = req.user
      const image = req.file ? req.file.filename : null
      if (!userId || !type || !description) return res.status(400).json({ message: 'complete los campos vacios' })
      const result = await Report.create({ userId, type, description, image, fecha })
      res.status(201).json({ success: true, data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getReport(req, res) {
    try {
      const result = await Report.all()
      res.json({ success: true, data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async reportId(req, res) {
    try {
      const result = await Report.byId(req.params.id)
      if (result.lenght === 0) return res.status(404).json({ message: 'resulte no encontrado' })
      res.json({ success: true, data: result })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async patchReport(req, res) {
    try {
      const { id } = req.params
      const { userId, type, description, fecha } = req.body
      const exixte = await Report.byId(id)
      if (!exixte) return res.status(404).json({ message: 'reporte no encontrado' })
      const image = req.file ? req.file.filename : exixte.image
      const result = await Report.update({ id, userId, type, description, image, fecha })
      if (result.affectedRows === 0) return res.status(404).json({ message: 'reporte no encontrado' })
      res.json({ success: true, data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async deleteReport(req, res) {
    try {
      const { id } = req.params
      const result = await Report.delete(id)
      if (result.affectedRows === 0) return res.status(404).json({ message: 'reporte no encontrado' })
      res.json({ success: true, data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }
}
