import { pool } from './src/infrastructure/database/db';

async function createTables() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    
    // Crear tabla roles
    console.log('📋 Creando tabla roles...');
    const rolesQuery = `
      CREATE TABLE IF NOT EXISTS roles (
        id_roles SERIAL PRIMARY KEY,
        nombre_rol VARCHAR(100) NOT NULL,
        descripcion TEXT
      );
    `;
    await pool.query(rolesQuery);
    console.log('✅ Tabla "roles" creada exitosamente');

    // Crear tabla permisos si no existe
    console.log('📋 Creando tabla permisos...');
    const permisosQuery = `
      CREATE TABLE IF NOT EXISTS permisos (
        id_permisos SERIAL PRIMARY KEY,
        nombre_permiso VARCHAR(100) NOT NULL,
        modulo VARCHAR(100)
      );
    `;
    await pool.query(permisosQuery);
    console.log('✅ Tabla "permisos" creada exitosamente');

    // Verificar que las tablas existan
    console.log('🔍 Verificando tablas...');
    const tables = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name IN ('roles', 'permisos')
    `);
    console.log('📊 Tablas encontradas:', tables.rows);
    
    console.log('✅ ¡Todas las tablas se crearon correctamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear tablas:', error);
    process.exit(1);
  }
}

createTables();
