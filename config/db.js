import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'beauty_smile',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    define: {
      timestamps: false
    },
    logging: false
  }
);

try {
  await sequelize.authenticate();
  console.log('✅ Conexión a MySQL con Sequelize exitosa.');
} catch (error) {
  console.error('❌ No se pudo conectar a la base de datos:', error.message);
}

export default sequelize;

