import { Role } from '../../domain/entities/Role';
import { RoleRepository } from '../../domain/repositories/RoleRepository';
import { pool } from '../database/db';

export class PostgresRoleRepository implements RoleRepository {
  async getAll(): Promise<Role[]> {
    const query = 'SELECT id AS id_roles, nombre AS nombre_rol, descripcion FROM roles';
    const res = await pool.query(query);
    return res.rows;
  }

  async getById(id: number): Promise<Role | null> {
    const query = 'SELECT id AS id_roles, nombre AS nombre_rol, descripcion FROM roles WHERE id = $1';
    const res = await pool.query(query, [id]);
    return res.rows[0] || null;
  }

  async create(role: Role): Promise<Role> {
    const query = 'INSERT INTO roles (nombre, descripcion) VALUES ($1, $2) RETURNING id AS id_roles, nombre AS nombre_rol, descripcion';
    const res = await pool.query(query, [role.nombre_rol, role.descripcion || null]);
    return res.rows[0];
  }

  async update(id: number, role: Partial<Role>): Promise<Role | null> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (role.nombre_rol !== undefined) {
      updates.push(`nombre = $${paramCount++}`);
      values.push(role.nombre_rol);
    }
    if (role.descripcion !== undefined) {
      updates.push(`descripcion = $${paramCount++}`);
      values.push(role.descripcion);
    }

    if (updates.length === 0) return this.getById(id);

    values.push(id);
    const query = `UPDATE roles SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id AS id_roles, nombre AS nombre_rol, descripcion`;
    const res = await pool.query(query, values);
    return res.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM roles WHERE id = $1';
    const res = await pool.query(query, [id]);
    return res.rowCount! > 0;
  }
}
