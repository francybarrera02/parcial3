import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Paciente = db.define(
  'paciente',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cedula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'pacientes',
    timestamps: false
  }
);

export default Paciente;
