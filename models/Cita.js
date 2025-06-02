import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import Paciente from './Paciente.js';
import Servicio from './Servicio.js';
import Medico from './Medico.js';

const Cita = db.define(
  'cita',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'pendiente'
    },
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    servicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    medico_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: 'citas',
    timestamps: false
  }
);

// Asociaciones
Cita.belongsTo(Paciente, {
  foreignKey: 'paciente_id',
  as: 'paciente',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Cita.belongsTo(Servicio, {
  foreignKey: 'servicio_id',
  as: 'servicio',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Cita.belongsTo(Medico, {
  foreignKey: 'medico_id',
  as: 'medico',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

export default Cita;
