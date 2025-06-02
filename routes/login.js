import express from 'express';
import { mostrarLogin, procesarLogin, cerrarSesion } from '../controllers/loginController.js';

const router = express.Router();

router.get('/login', mostrarLogin);       // Mostrar formulario
router.post('/login', procesarLogin);     // Procesar login
router.get('/logout', cerrarSesion);      // Cerrar sesión

export default router;
