import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

import loginRoutes from './routes/login.js';
import indexRoutes from './routes/index.js';
import pacientesRoutes from './routes/pacientes.js';
import citasRoutes from './routes/citas.js';
import serviciosRoutes from './routes/servicios.js';
import historialRoutes from './routes/historiales.js';
import medicosRoutes from './routes/medicos.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ Configurar carpeta pública para imágenes, CSS y JS
app.use(express.static(path.join(__dirname, 'public')));

// Configuraciones de plantilla
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: false
}));

// Middleware para compartir sesión en las vistas
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// Rutas
app.use('/', loginRoutes);
app.use('/inicio', indexRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/citas', citasRoutes);
app.use('/servicios', serviciosRoutes);
app.use('/historiales', historialRoutes);
app.use('/medicos', medicosRoutes);

// Redirección por defecto
app.get('/', (req, res) => {
  if (req.session.usuario) {
    res.redirect('/inicio');
  } else {
    res.redirect('/login');
  }
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
