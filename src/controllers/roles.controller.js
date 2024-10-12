import Role from '../models/role.js'
export default class RoleController {
  static async postRole(req, res) {
    try {
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'Complete los campos vacios' })
      const result = await Role.create({ name })
      res.status(201).json({ data: result })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async getAll(req, res) {
    try {
      const result = await Role.all()
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async getId(req, res) {
    try {
      const { id } = req.params
      const result = await Role.byId(id)
      if (!result) return res.status(404).json({ message: 'Estatus no encontrado' })
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async patchRole(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      if (!name) return res.status(400).json({ message: 'Complete los campos vacios' })
      const result = await Role.update({ id, name })
      if (!result) return res.status(404).json({ message: 'Estatus no encontrado' })
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }

  static async deleteRole(req, res) {
    try {
      const { id } = req.params
      const result = await Role.delete(id)
      if (!result) return res.status(404).json({ message: 'Estatus no encontrado' })
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Estatus no eliminado' })
      res.json({ data: result })
    } catch (error) { res.status(500).json({ error: error.message }) }
  }
}
