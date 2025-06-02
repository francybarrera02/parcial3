import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Administrador = db.define('administrador', {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'administradores' // 👈 Asegúrate que este nombre coincida con tu tabla en MySQL
});

export default Administrador;
