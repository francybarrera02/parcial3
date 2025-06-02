// controllers/serviciosController.js
import Servicio from '../models/Servicio.js'
import { Op } from 'sequelize'

export const listarServicios = async (req, res) => {
  const { page = 1, search = '', edit } = req.query
  const limit = 5
  const offset = (page - 1) * limit

  const where = search
    ? {
        nombre: {
          [Op.like]: `%${search}%`,
        },
      }
    : {}

  const { rows: servicios, count } = await Servicio.findAndCountAll({
    where,
    limit,
    offset,
  })

  const totalPages = Math.ceil(count / limit)

  let servicioEdit = null
  if (edit) {
    servicioEdit = await Servicio.findByPk(edit)
  }

  res.render('servicios', {
    servicios,
    currentPage: parseInt(page),
    totalPages,
    search,
    servicioEdit,
  })
}

export const registrarServicio = async (req, res) => {
  await Servicio.create(req.body)
  res.redirect('/servicios')
}

export const actualizarServicio = async (req, res) => {
  const { id } = req.params
  const { nombre, descripcion, precio } = req.body
  await Servicio.update(
    { nombre, descripcion, precio },
    { where: { id } }
  )
  res.redirect('/servicios')
}

export const eliminarServicio = async (req, res) => {
  await Servicio.destroy({ where: { id: req.params.id } })
  res.redirect('/servicios')
}
