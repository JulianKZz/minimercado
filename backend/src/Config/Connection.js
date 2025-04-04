//Connection
import sql from 'mssql';  // Importar el módulo de mssql

// Configuración de la base de datos
const config = {
    user: 'Conexion',
    password: '123',
    server: 'localhost',
    database: 'React',
    options: {
        encrypt: true,  // Si tu base de datos requiere cifrado
        trustServerCertificate: true,  // Si el certificado del servidor no es confiable
    },
};

// Crear y exportar un pool de conexiones
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a SQL Server:', err);
        process.exit(1);  // Salir del proceso si no se puede conectar
    });

// Exportar el poolPromise para usarlo en otros archivos
export { poolPromise };

// Exportar la configuración de mssql para usarla en otros archivos
export default sql;
