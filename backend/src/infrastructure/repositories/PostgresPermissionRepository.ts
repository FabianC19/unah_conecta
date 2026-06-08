import query from '../database/db';
import { Permission, CreatePermissionDTO, UpdatePermissionDTO } from '../../domain/entities/Permission';
import { PermissionRepository } from '../../use-cases/PermissionUseCases';

export class PostgresPermissionRepository implements PermissionRepository {
  
  async getAll(): Promise<Permission[]> {
    const text = 'SELECT id_permisos, nombre_permiso, modulo FROM permisos ORDER BY id_permisos ASC';
    const res = await query(text);
    return res.rows;
  }

  async getById(id: number): Promise<Permission | null> {
    const text = 'SELECT id_permisos, nombre_permiso, modulo FROM permisos WHERE id_permisos = $1 LIMIT 1';
    const res = await query(text, [id]);
    if (res.rows.length === 0) return null;
    return res.rows[0];
  }

  async create(data: CreatePermissionDTO): Promise<Permission> {
    const text = 'INSERT INTO permisos (nombre_permiso, modulo) VALUES ($1, $2) RETURNING id_permisos, nombre_permiso, modulo';
    const res = await query(text, [data.nombre_permiso, data.modulo]);
    return res.rows[0];
  }

  async update(id: number, data: UpdatePermissionDTO): Promise<Permission> {
    const text = `
      UPDATE permisos
      SET nombre_permiso = COALESCE($1, nombre_permiso),
          modulo = COALESCE($2, modulo)
      WHERE id_permisos = $3
      RETURNING id_permisos, nombre_permiso, modulo
    `;
    const res = await query(text, [data.nombre_permiso, data.modulo, id]);
    return res.rows[0];
  }

  async delete(id: number): Promise<void> {
    const text = 'DELETE FROM permisos WHERE id_permisos = $1';
    await query(text, [id]);
  }
}