import { Request, Response } from 'express';

export class PermissionController {
  constructor(
    private getAllPermissions: any,
    private getPermissionById: any,
    private createPermission: any,
    private updatePermission: any,
    private deletePermission: any
  ) {}

  private parseId = (idParam: string | string[]): number => {
    return parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const permissions = await this.getAllPermissions.execute();
      res.status(200).json(permissions);
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Error al obtener los permisos', error: error.message });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const idParam = req.params.id;
      const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);
      const permission = await this.getPermissionById.execute(id);
      if (!permission) {
        res.status(404).json({ success: false, message: 'Permiso no encontrado' });
        return;
      }
      res.status(200).json(permission);
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Error al obtener el permiso', error: error.message });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre_permiso, modulo } = req.body;
      if (!nombre_permiso || !modulo) {
        res.status(400).json({ success: false, message: 'El nombre del permiso y el módulo son requeridos' });
        return;
      }
      const newPermission = await this.createPermission.execute({ nombre_permiso, modulo });
      res.status(201).json(newPermission);
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Error al crear el permiso', error: error.message });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const idParam = req.params.id;
      const id = parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);
      const { nombre_permiso, modulo } = req.body;
      const updatedPermission = await this.updatePermission.execute(id, { nombre_permiso, modulo });
      res.status(200).json(updatedPermission);
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Error al actualizar el permiso', error: error.message });
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = this.parseId(req.params.id);
      await this.deletePermission.execute(id);
      res.status(200).json({ success: true, message: 'Permiso eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Error al eliminar el permiso', error: error.message });
    }
  };
}