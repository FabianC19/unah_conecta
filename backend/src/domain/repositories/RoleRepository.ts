import { Role } from '../entities/Role';

export interface RoleRepository {
  getAll(): Promise<Role[]>;
  getById(id: number): Promise<Role | null>;
  create(role: Role): Promise<Role>;
  update(id: number, role: Partial<Role>): Promise<Role | null>;
  delete(id: number): Promise<boolean>;
}
