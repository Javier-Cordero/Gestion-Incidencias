import State from '../models/State.js'
export default class StateController {
  static async postState(req, res) {
    try {
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'Complete los campos vacios' })
      const result = await State.create({ name })
      res.status(201).json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getAll(req, res) {
    try {
      const result = await State.all()
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getId(req, res) {
    try {
      const { id } = req.params
      const result = await State.byId(id)
      if (!result) return res.status(404).json({ message: 'Estatus no encontrado' })
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async patchState(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'Complete los campos vacios' })
      const result = await State.update({ id, name })
      if (!result) return res.status(404).json({ message: 'Estatus no encontrado' })
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async deleteState(req, res) {
    try {
      const { id } = req.params
      const result = await State.delete(id)
      if (!result) return res.status(404).json({ message: 'Estatus no encontrado' })
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Estatus no eliminado' })
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }
}
