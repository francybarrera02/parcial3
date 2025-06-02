// controllers/medicosController.js

import Medico from '../models/Medico.js';
import { Op } from 'sequelize';

export const listarMedicos = async (req, res) => {
  try {
    const { page = 1, search = '', edit } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    // Construimos el filtro "where" para buscador
    const where = search
      ? { nombre: { [Op.like]: `%${search}%` } }
      : {};

    // Obtenemos la página actual de médicos y el conteo total
    const { rows: medicos, count } = await Medico.findAndCountAll({
      where,
      limit,
      offset,
    });

    // Calculamos total de páginas
    const totalPages = Math.ceil(count / limit);

    // Si hay query ?edit=<id>, buscamos ese médico para precargar en el formulario
    let medicoEdit = null;
    if (edit) {
      medicoEdit = await Medico.findByPk(edit);
    }

    // Enviamos todo al render
    res.render('medicos', {
      medicos,
      currentPage: parseInt(page),
      totalPages,
      search,
      medicoEdit, // será null si no estamos editando
    });
  } catch (error) {
    console.error('Error al listar médicos:', error.message);
    res.send('Error al cargar médicos');
  }
};

export const registrarMedico = async (req, res) => {
  try {
    await Medico.create(req.body);
    res.redirect('/medicos');
  } catch (error) {
    console.error('Error al registrar médico:', error.message);
    res.send('Error al registrar médico');
  }
};

export const eliminarMedico = async (req, res) => {
  try {
    await Medico.destroy({ where: { id: req.params.id } });
    res.redirect('/medicos');
  } catch (error) {
    console.error('Error al eliminar médico:', error.message);
    res.send('Error al eliminar médico');
  }
};

export const actualizarMedico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especialidad } = req.body;
    await Medico.update({ nombre, especialidad }, { where: { id } });
    res.redirect('/medicos');
  } catch (error) {
    console.error('Error al actualizar médico:', error.message);
    res.send('Error al actualizar médico');
  }
};
