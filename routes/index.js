import express from 'express';
import { verificarSesion } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verificarSesion, (req, res) => {
  res.render('inicio', { usuario: req.session.usuario });
});

router.get('/inicio', (req, res) => {
  res.render('inicio', {
    usuario: req.session.usuario,
    bodyClass: 'inicio-bg'
  });
});


export default router;
