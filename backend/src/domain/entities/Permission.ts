// =======================================================
// ENTIDAD: Permission (Permisos)
// Capa: Domain
// =======================================================

export interface Permission {
  id_permisos: number;
  nombre_permiso: string;
  modulo: string;
}

// DTO para la creación de un nuevo permiso
export interface CreatePermissionDTO {
  nombre_permiso: string;
  modulo: string;
}

// DTO para la actualización de un permiso existente
export interface UpdatePermissionDTO {
  nombre_permiso?: string;
  modulo?: string;
}