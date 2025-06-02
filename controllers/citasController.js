// controllers/citasController.js
import Cita from '../models/Cita.js';
import Paciente from '../models/Paciente.js';
import Servicio from '../models/Servicio.js';
import Medico from '../models/Medico.js';
import { Op } from 'sequelize';

export const listarCitas = async (req, res) => {
  try {
    // ── Parámetros de paginación y búsqueda ───────────────────────
    const { page = 1, search = '', edit } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    // ── Construir condición “where” para filtrar por nombre de paciente ─
    //    si “search” no está vacío, se filtra por Paciente.nombre LIKE %search%
    const pacienteWhere = search
      ? { nombre: { [Op.like]: `%${search}%` } }
      : null;

    // ── Obtenemos lista paginada + conteo total ──────────────────────
    //    Usamos “findAndCountAll” con include de Paciente (alias 'paciente'),
    //    para poder aplicar el where directamente en la relación.
    const { rows: citas, count } = await Cita.findAndCountAll({
      limit,
      offset,
      order: [['fecha', 'DESC']],
      include: [
        {
          model: Paciente,
          as: 'paciente',
          required: true,       // si queremos filtrar por nombre, lo hacemos “required”
          where: pacienteWhere, // si pacienteWhere es null, Sequelize lo ignora
        },
        { model: Servicio, as: 'servicio', required: false },
        { model: Medico, as: 'medico', required: false },
      ],
    });

    const totalPages = Math.ceil(count / limit);

    // ── Para llenar los <select> del formulario ──────────────────────
    const pacientes = await Paciente.findAll();
    const servicios = await Servicio.findAll();
    const medicos = await Medico.findAll();

    // ── Si vengo en modo “edit”, cargamos la cita para autocompletar
    let citaEdit = null;
    if (edit) {
      citaEdit = await Cita.findByPk(edit, {
        include: [
          { model: Paciente, as: 'paciente' },
          { model: Servicio, as: 'servicio' },
          { model: Medico, as: 'medico' },
        ],
      });
      // Si no existe la cita, ignoramos “edit”
      if (!citaEdit) citaEdit = null;
    }

    // ── Render de la vista “citas.pug” ───────────────────────────────
    res.render('citas', {
      citas,
      pacientes,
      servicios,
      medicos,
      currentPage: Number(page),
      totalPages,
      search,
      citaEdit,
    });
  } catch (error) {
    console.error('Error al listar citas:', error);
    res.send('Error al cargar citas');
  }
};

export const registrarCita = async (req, res) => {
  try {
    // Si viene en modo edición, Sequelize detecta por URL “/citas/actualizar/:id”
    // En ese caso, la ruta confirmará con otro método (ver más abajo).
    await Cita.create({
      fecha: req.body.fecha,
      estado: req.body.estado,
      paciente_id: req.body.paciente_id,
      servicio_id: req.body.servicio_id,
      medico_id: req.body.medico_id || null,
      observaciones: req.body.observaciones || null,
    });
    res.redirect('/citas');
  } catch (error) {
    console.error('Error al registrar cita:', error);
    res.send('Error al registrar cita');
  }
};

export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, estado, paciente_id, servicio_id, medico_id, observaciones } = req.body;

    await Cita.update(
      {
        fecha,
        estado,
        paciente_id,
        servicio_id,
        medico_id: medico_id || null,
        observaciones: observaciones || null,
      },
      { where: { id } }
    );
    res.redirect('/citas');
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    res.send('Error al actualizar cita');
  }
};

export const cancelarCita = async (req, res) => {
  try {
    await Cita.destroy({ where: { id: req.params.id } });
    res.redirect('/citas');
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    res.send('Error al cancelar cita');
  }
};

export const atenderCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).send('Cita no encontrada');
    cita.estado = 'en consulta';
    await cita.save();
    res.redirect('/citas');
  } catch (error) {
    console.error('Error al atender cita:', error);
    res.send('Error al atender cita');
  }
};

export const finalizarCita = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).send('Cita no encontrada');
    cita.estado = 'finalizada';
    await cita.save();
    res.redirect('/citas');
  } catch (error) {
    console.error('Error al finalizar cita:', error);
    res.send('Error al finalizar cita');
  }
};
