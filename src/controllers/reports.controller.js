import Report from '../models/Report.js'
export default class ReportController {
  static async postReport (req, res) {
    try {
      const { userId, type, description, image } = req.body
      const report = await Report.create({ userId, type, description, image })
      console.log(report)
      res.status(201).json({ message: 'Report created successfully', data: report })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async getReport (req, res) {
    try {
      const reports = await Report.all()
      res.json(reports)
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async reportId (req, res) {
    try {
      const report = await Report.byId(req.params.id)
      if (report.lenght === 0) return res.status(404).json({ message: 'reporte no encontrado' })
      res.json(report)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async patchReport (req, res) {
    try {
      const { id } = req.params
      const { userId, type, description, image } = req.body
      const report = await Report.update({ id, userId, type, description, image })
      if (report.affectedRows === 0) return res.status(404).json({ message: 'reporte no encontrado' })
      res.json({ message: 'Reporte actualizado correctamente', data: report })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async deleteReport (req, res) {
    try {
      const { id } = req.params
      const report = await Report.delete(id)
      if (report.affectedRows === 0) return res.status(404).json({ message: 'reporte no encontrado' })
      res.json({ message: 'Reporte eliminado correctamente' })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }
}
