import React, { useEffect, useState } from 'react';

interface RoleData {
  id_roles?: number;
  nombre_rol: string;
  descripcion?: string;
}

export const RolesView: React.FC = () => {
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleData | null>(null);
  const [nombreRol, setNombreRol] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const API_URL = 'http://localhost:5000/api/roles';

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener los roles desde el servidor');
      const data = await response.json();
      setRoles(data);
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOpenCreateModal = () => {
    setSelectedRole(null);
    setNombreRol('');
    setDescripcion('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (role: RoleData) => {
    setSelectedRole(role);
    setNombreRol(role.nombre_rol);
    setDescripcion(role.descripcion || '');
    setIsModalOpen(true);
  };

  const handleSaveRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = selectedRole?.id_roles ? `${API_URL}/${selectedRole.id_roles}` : API_URL;
      const method = selectedRole?.id_roles ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_rol: nombreRol, descripcion }),
      });

      if (!response.ok) throw new Error('No se pudo guardar el rol');

      setIsModalOpen(false);
      fetchRoles();
    } catch (err: any) {
      alert(err.message || 'Error al guardar el rol');
    }
  };

  const handleDeleteRole = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este rol?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar el rol');
        fetchRoles();
      } catch (err: any) {
        alert(err.message || 'Error al eliminar el rol');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-800 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              👥 Módulo de Roles
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Gestiona los roles de la plataforma UNAH Conecta.</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="mt-4 md:mt-0 px-5 py-2.5 bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all"
          >
            + Nuevo Rol
          </button>
        </div>

        {loading && <div className="text-center py-12 text-gray-500 animate-pulse">Cargando roles...</div>}
        {error && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-center max-w-md mx-auto">
            <p className="text-red-400 font-medium mb-3">⚠️ Error: {error}</p>
            <button
              onClick={fetchRoles}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id_roles}
                className="relative rounded-2xl border border-gray-800 bg-[#0c1220] p-6 shadow-xl hover:border-blue-500/30 transition-all group"
              >
                <div className="absolute top-4 right-4 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Rol
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#151f33] text-blue-400 group-hover:scale-110 transition-transform">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors">
                      {role.nombre_rol}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">ID: {role.id_roles}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6 min-h-[3rem]">
                  {role.descripcion || 'Sin descripción'}
                </p>

                <div className="flex gap-2 items-center border-t border-gray-800/60 pt-4">
                  <button
                    onClick={() => role.id_roles && handleOpenEditModal(role)}
                    className="flex-1 py-2 px-3 text-sm bg-[#161f32] text-white hover:bg-[#1f2c47] font-semibold rounded-xl transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => role.id_roles && handleDeleteRole(role.id_roles)}
                    className="py-2 px-3 bg-red-950/20 border border-red-900/40 hover:bg-red-900/20 text-red-400 rounded-xl transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {roles.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-600 border-2 border-dashed border-gray-900 rounded-2xl">
                No hay roles creados todavía.
              </div>
            )}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#0b0f19] p-6 shadow-2xl text-white">
              <h3 className="text-xl font-bold mb-4 text-blue-400">
                {selectedRole ? '✏️ Editar Rol' : '👥 Nuevo Rol'}
              </h3>
              <form onSubmit={handleSaveRole} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nombre del Rol</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Administrador"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#131a26] border border-gray-800 text-white focus:outline-none focus:border-blue-500"
                    value={nombreRol}
                    onChange={(e) => setNombreRol(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
                  <textarea
                    placeholder="Describe el rol..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#131a26] border border-gray-800 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    {selectedRole ? 'Actualizar' : 'Crear'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 px-4 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
