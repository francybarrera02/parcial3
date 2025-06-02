import Sequelize from 'sequelize';

const db = new Sequelize(
  'b7pcxohuphbteiurtvrw', // base de datos
  'utgyt47g2pq7cqtf',     // usuario
  'DDUEMFOMTzlbTspvwXwO', // contraseña
  {
    host: 'b7pcxohuphbteiurtvrw-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306, // agregar explícitamente el puerto si es necesario
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
);

export default db;

