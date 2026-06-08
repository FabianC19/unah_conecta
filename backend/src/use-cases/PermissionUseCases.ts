import { Permission, CreatePermissionDTO, UpdatePermissionDTO } from '../domain/entities/Permission';

export interface PermissionRepository {
  getAll(): Promise<Permission[]>;
  getById(id: number): Promise<Permission | null>;
  create(data: CreatePermissionDTO): Promise<Permission>;
  update(id: number, data: UpdatePermissionDTO): Promise<Permission>;
  delete(id: number): Promise<void>;
}

export class GetAllPermissions {
  constructor(private repository: PermissionRepository) {}
  async execute(): Promise<Permission[]> {
    return await this.repository.getAll();
  }
}

export class GetPermissionById {
  constructor(private repository: PermissionRepository) {}
  async execute(id: number): Promise<Permission | null> {
    return await this.repository.getById(id);
  }
}

export class CreatePermission {
  constructor(private repository: PermissionRepository) {}
  async execute(data: CreatePermissionDTO): Promise<Permission> {
    return await this.repository.create(data);
  }
}

export class UpdatePermission {
  constructor(private repository: PermissionRepository) {}
  async execute(id: number, data: UpdatePermissionDTO): Promise<Permission> {
    return await this.repository.update(id, data);
  }
}

export class DeletePermission {
  constructor(private repository: PermissionRepository) {}
  async execute(id: number): Promise<void> {
    return await this.repository.delete(id);
  }
}