import { Role } from '../domain/entities/Role';
import { RoleRepository } from '../domain/repositories/RoleRepository';

export class GetAllRoles {
  constructor(private repository: RoleRepository) {}
  async execute(): Promise<Role[]> {
    return this.repository.getAll();
  }
}

export class GetRoleById {
  constructor(private repository: RoleRepository) {}
  async execute(id: number): Promise<Role | null> {
    return this.repository.getById(id);
  }
}

export class CreateRole {
  constructor(private repository: RoleRepository) {}
  async execute(role: Role): Promise<Role> {
    return this.repository.create(role);
  }
}

export class UpdateRole {
  constructor(private repository: RoleRepository) {}
  async execute(id: number, role: Partial<Role>): Promise<Role | null> {
    return this.repository.update(id, role);
  }
}

export class DeleteRole {
  constructor(private repository: RoleRepository) {}
  async execute(id: number): Promise<boolean> {
    return this.repository.delete(id);
  }
}
