// routes/medicos.js

import express from 'express';
import {
  listarMedicos,
  registrarMedico,
  eliminarMedico,
  actualizarMedico,
} from '../controllers/medicosController.js';

const router = express.Router();

router.get('/', listarMedicos);
router.post('/registrar', registrarMedico);
router.post('/actualizar/:id', actualizarMedico);
router.get('/eliminar/:id', eliminarMedico);

export default router;
