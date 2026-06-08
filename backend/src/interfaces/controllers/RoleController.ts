import { Request, Response } from 'express';
import { GetAllRoles, GetRoleById, CreateRole, UpdateRole, DeleteRole } from '../../use-cases/RoleUseCases';

export class RoleController {
  constructor(
    private getAllRoles: GetAllRoles,
    private getRoleById: GetRoleById,
    private createRole: CreateRole,
    private updateRole: UpdateRole,
    private deleteRole: DeleteRole
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const roles = await this.getAllRoles.execute();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const role = await this.getRoleById.execute(id);
      if (!role) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const role = await this.createRole.execute(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const role = await this.updateRole.execute(id, req.body);
      if (!role) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const success = await this.deleteRole.execute(id);
      if (!success) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }
      res.status(200).json({ message: 'Rol eliminado' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
