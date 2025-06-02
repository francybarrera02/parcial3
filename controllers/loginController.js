import Administrador from '../models/Administrador.js';

export const mostrarLogin = (req, res) => {
  res.render('login', { error: null });
};

export const procesarLogin = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const admin = await Administrador.findOne({ where: { usuario, clave } });

    if (!admin) {
      return res.render('login', { error: 'Credenciales inválidas' });
    }

    req.session.usuario = admin.usuario;
    res.redirect('/inicio');
  } catch (error) {
    console.error('Error en login:', error);
    res.render('login', { error: 'Error del servidor' });
  }
};

export const cerrarSesion = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};
