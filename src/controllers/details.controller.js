import Details from '../models/Details.js'
export default class DetailController {
  static async postDetail (req, res) {
    try {
      const { reportId, stateId, description } = req.body
      const detail = await Details.create({ reportId, stateId, description })
      res.status(201).json(detail)
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getAll (req, res) {
    try {
      const details = await Details.all()
      res.status(201).json(details)
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getId (req, res) {
    try {
      const detail = await Details.byId(req.params.id)
      if (!detail) return res.status(404).json({ message: 'Detalle no encontrado' })
      res.status(201).json(detail)
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async patchDetail (req, res) {
    try {
      const { id } = req.params
      const { reportId, stateId, description } = req.body
      const detail = await Details.update({ id, reportId, stateId, description })
      if (detail.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' })
      res.status(201).json(detail)
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async deleteDetail (req, res) {
    try {
      const { id } = req.params
      const detail = await Details.delete(id)
      if (!detail) return res.status(404).json({ message: 'Detalle no encontrado' })
      if (detail.affectedRows === 0) return res.status(404).json({ message: 'Detalle no eliminado' })
      res.status(201).json({ message: 'Detalle eliminado correctamente' })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }
}
