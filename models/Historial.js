import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Paciente from './Paciente.js';

const Historial = sequelize.define('Historial', {
  detalle: { type: DataTypes.TEXT, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: 'historiales',
  timestamps: false
});

// Relaciones
Historial.belongsTo(Paciente, { foreignKey: 'paciente_id' });

export default Historial;
