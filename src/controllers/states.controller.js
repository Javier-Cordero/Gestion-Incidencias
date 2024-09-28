import State from '../models/State.js'
export default class StateController {
  static async postState (req, res) {
    try {
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'Complete los campos vacios' })
      const state = await State.create({ name })
      res.status(201).json({ message: 'Estatus creado', data: state })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async getAll (req, res) {
    try {
      const states = await State.all()
      res.json(states)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async getId (req, res) {
    try {
      const { id } = req.params
      const state = await State.byId(id)
      if (!state) return res.status(404).json({ message: 'Estatus no encontrado' })
      res.json(state)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async patchState (req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'Complete los campos vacios' })
      const state = await State.update({ id, name })
      if (!state) return res.status(404).json({ message: 'Estatus no encontrado' })
      res.json({ message: 'Estatus actualizado', data: state })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async deleteState (req, res) {
    try {
      const { id } = req.params
      const state = await State.delete(id)
      if (!state) return res.status(404).json({ message: 'Estatus no encontrado' })
      if (state.affectedRows === 0) return res.status(404).json({ message: 'Estatus no eliminado' })
      res.json({ message: 'Estatus eliminado' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
