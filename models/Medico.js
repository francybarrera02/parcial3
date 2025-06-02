import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Medico = db.define('medico', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'medicos',
  timestamps: false
});

export default Medico;
