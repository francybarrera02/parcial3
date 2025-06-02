import { Sequelize } from 'sequelize';

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: false
      }
    },
    logging: false
  }
);

try {
  await db.authenticate();
  console.log('✅ Conexión a MySQL con Sequelize exitosa.');
} catch (error) {
  console.error('❌ Error al conectar con MySQL:', error);
}

export default db;
