// routes/citas.js
import express from 'express';
import {
  listarCitas,
  registrarCita,
  actualizarCita,
  cancelarCita,
  atenderCita,
  finalizarCita,
} from '../controllers/citasController.js';

const router = express.Router();

router.get('/', listarCitas);
router.post('/registrar', registrarCita);
router.post('/actualizar/:id', actualizarCita);  // ruta para actualizar
router.get('/cancelar/:id', cancelarCita);
router.get('/atender/:id', atenderCita);
router.get('/finalizar/:id', finalizarCita);

export default router;
