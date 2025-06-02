import { Sequelize } from 'sequelize';

const db = new Sequelize(
  'b7pcxohuphbteiurtvrw', // Nombre de la base de datos
  'utgyt47g2pq7cqtf',     // Usuario
  'DDUEMFOMTzIbTspvvXwO', // Contraseña
  {
    host: 'b7pcxohuphbteiurtvrw-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    port: 3306, // Puerto estándar
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
    logging: false // Opcional: desactiva logs en consola
  }
);

// Autenticación
try {
  await db.authenticate();
  console.log('Conexión a MySQL con Sequelize exitosa.');
} catch (error) {
  console.error(' No se pudo conectar a la base de datos:', error);
}

export default db;
