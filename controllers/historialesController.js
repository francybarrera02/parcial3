import Historial from '../models/Historial.js';
import Paciente from '../models/Paciente.js';

export const mostrarHistorial = async (req, res) => {
  const paciente = await Paciente.findByPk(req.params.id);
  const historiales = await Historial.findAll({
    where: { paciente_id: req.params.id }
  });
  res.render('historiales', { paciente, historiales });
};

export const agregarHistorial = async (req, res) => {
  await Historial.create(req.body);
  res.redirect(`/historiales/${req.body.paciente_id}`);
};
export const eliminarHistorial = async (req, res) => {
  await Historial.destroy({ where: { id: req.params.id } });
  res.redirect(`/historiales/${req.params.paciente_id}`);
};