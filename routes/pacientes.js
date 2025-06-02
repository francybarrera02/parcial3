import express from 'express';
import {
  listarPacientes,
  registrarPaciente,
  actualizarPaciente,
  eliminarPaciente
} from '../controllers/pacientesController.js';

const router = express.Router();

// Listar (con paginación, búsqueda y posible edición)
router.get('/', listarPacientes);

// Registrar nuevo paciente
router.post('/registrar', registrarPaciente);

// Actualizar datos de un paciente existente
router.post('/actualizar/:id', actualizarPaciente);

// Eliminar paciente (y sus citas asociadas, en el controlador)
router.get('/eliminar-paciente/:id', eliminarPaciente);

export default router;
