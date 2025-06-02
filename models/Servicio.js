import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Servicio = sequelize.define('Servicio', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
  tableName: 'servicios',
  timestamps: false
});

export default Servicio;
