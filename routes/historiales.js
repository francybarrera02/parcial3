// routes/historiales.js
import express from 'express';
import { mostrarHistorial, agregarHistorial } from '../controllers/historialesController.js';
const router = express.Router();

router.get('/:id', mostrarHistorial);
router.post('/agregar', agregarHistorial);

export default router;

