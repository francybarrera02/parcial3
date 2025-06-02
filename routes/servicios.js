// routes/servicios.js
import express from 'express'
import {
  listarServicios,
  registrarServicio,
  actualizarServicio,
  eliminarServicio,
} from '../controllers/serviciosController.js'

const router = express.Router()

router.get('/', listarServicios)
router.post('/registrar', registrarServicio)
router.post('/actualizar/:id', actualizarServicio)
router.get('/eliminar/:id', eliminarServicio)

export default router
