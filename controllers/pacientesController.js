import Paciente from '../models/Paciente.js';
import Cita from '../models/Cita.js';
import { Op } from 'sequelize';

export const listarPacientes = async (req, res) => {
  try {
    const { page = 1, search = '', edit } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    const where = search
      ? { nombre: { [Op.like]: `%${search}%` } }
      : {};

    const { rows: pacientes, count } = await Paciente.findAndCountAll({
      where,
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    let pacienteEdit = null;
    if (edit) {
      pacienteEdit = await Paciente.findByPk(edit);
    }

    res.render('pacientes', {
      pacientes,
      currentPage: parseInt(page),
      totalPages,
      search,
      pacienteEdit
    });
  } catch (error) {
    console.error('Error al listar pacientes:', error.message);
    res.send('Error al cargar pacientes');
  }
};

export const registrarPaciente = async (req, res) => {
  try {
    await Paciente.create(req.body);
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al registrar paciente:', error.message);
    res.send('Error al registrar paciente');
  }
};

export const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const { nombre, cedula, telefono, direccion } = req.body;
  try {
    await Paciente.update(
      { nombre, cedula, telefono, direccion },
      { where: { id } }
    );
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al actualizar paciente:', error.message);
    res.send('Error al actualizar paciente');
  }
};

export const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    // Primero borro las citas vinculadas a este paciente
    await Cita.destroy({ where: { paciente_id: id } });

    // Luego borro el paciente
    await Paciente.destroy({ where: { id } });

    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al eliminar paciente:', error.message);
    res.status(500).send('Error al eliminar paciente');
  }
};
