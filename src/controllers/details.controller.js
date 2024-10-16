import Details from '../models/Details.js'
export default class DetailController {
  static async postDetail(req, res) {
    try {
      const { reportId, userId, description, fecha } = req.body
      const stateId = 1
      const result = await Details.create({ reportId, stateId, userId, description, fecha })
      console.log(result)
      res.status(201).json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getAll(req, res) {
    try {
      const result = await Details.all()
      res.status(201).json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getId(req, res) {
    try {
      const result = await Details.byId(req.params.id)
      if (!result) return res.status(404).json({ message: 'Detalle no encontrado' })
      res.status(201).json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async patchDetail(req, res) {
    try {
      const { id } = req.params
      const { reportId, stateId, userId, description, fecha } = req.body
      const result = await Details.update({ id, reportId, stateId, userId, description, fecha })
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no encontrado' })
      res.status(201).json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async deleteDetail(req, res) {
    try {
      const { id } = req.params
      const result = await Details.delete(id)
      if (!result) return res.status(404).json({ message: 'Detalle no encontrado' })
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle no eliminado' })
      res.status(201).json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }
}
