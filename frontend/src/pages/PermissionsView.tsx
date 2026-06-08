import React, { useEffect, useState } from 'react';

interface PermissionData {
  id_permisos?: number;
  nombre_permiso: string;
  modulo: string;
}

export const PermissionsView: React.FC = () => {
  const [permissions, setPermissions] = useState<PermissionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para el Modal (Crear / Editar)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<PermissionData | null>(null);
  const [nombrePermiso, setNombrePermiso] = useState('');
  const [modulo, setModulo] = useState('');

  const API_URL = 'http://localhost:5000/api/permissions';

  // 🔄 Cargar Permisos desde el Backend
  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener los datos del servidor');
      const data = await response.json();
      setPermissions(data);
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // 📝 Abrir Modal para Crear
  const handleOpenCreateModal = () => {
    setSelectedPermission(null);
    setNombrePermiso('');
    setModulo('');
    setIsModalOpen(true);
  };

  // 📝 Abrir Modal para Editar
  const handleOpenEditModal = (perm: PermissionData) => {
    setSelectedPermission(perm);
    setNombrePermiso(perm.nombre_permiso);
    setModulo(perm.modulo);
    setIsModalOpen(true);
  };

  // 💾 Guardar o Actualizar Permiso
  const handleSavePermission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = selectedPermission?.id_permisos ? `${API_URL}/${selectedPermission.id_permisos}` : API_URL;
      const method = selectedPermission?.id_permisos ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_permiso: nombrePermiso, modulo: modulo }),
      });

      if (!response.ok) throw new Error('No se pudo guardar el permiso');

      setIsModalOpen(false);
      fetchPermissions();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 🗑️ Eliminar Permiso
  const handleDeletePermission = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este permiso?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar');
        fetchPermissions();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] p-8 text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-800 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              🔑 Módulo de Permisos
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Gestiona los accesos por funcionalidad de la plataforma UNAH Conecta.</p>
          </div>
          <button 
            onClick={handleOpenCreateModal}
            className="mt-4 md:mt-0 px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all transform hover:-translate-y-0.5"
          >
            + Nuevo Permiso
          </button>
        </div>

        {/* LOADING & ERROR */}
        {loading && <div className="text-center py-12 text-gray-500 animate-pulse">Cargando permisos...</div>}
        {error && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-center max-w-md mx-auto">
            <p className="text-red-400 font-medium mb-3">⚠️ Error: {error}</p>
            <button onClick={fetchPermissions} className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
              Reintentar
            </button>
          </div>
        )}

        {/* REJILLA DE PERMISOS */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {permissions.map((perm) => (
              <div 
                key={perm.id_permisos} 
                className="relative rounded-2xl border border-gray-800 bg-[#0c1220] p-6 shadow-xl hover:border-amber-500/30 transition-all group"
              >
                <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {perm.modulo}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#151f33] text-amber-400 group-hover:scale-110 transition-transform">
                    🔑
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors">
                      {perm.nombre_permiso}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">ID: {perm.id_permisos}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6">
                  Permite realizar operaciones específicas en el módulo de <span className="text-gray-300 font-medium">{perm.modulo}</span>.
                </p>

                <div className="flex gap-2 items-center border-t border-gray-800/60 pt-4">
                  <button 
                    onClick={() => handleOpenEditModal(perm)}
                    className="flex-1 py-2 px-3 text-sm bg-[#161f32] text-white hover:bg-[#1f2c47] font-semibold rounded-xl transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => perm.id_permisos && handleDeletePermission(perm.id_permisos)}
                    className="py-2 px-3 bg-red-950/20 border border-red-900/40 hover:bg-red-900/20 text-red-400 rounded-xl transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            {permissions.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-600 border-2 border-dashed border-gray-900 rounded-2xl">
                No hay permisos creados todavía.
              </div>
            )}
          </div>
        )}

        {/* MODAL INTEGRADO */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#0b0f19] p-6 shadow-2xl text-white">
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                {selectedPermission ? '✏️ Editar Permiso' : '🔑 Nuevo Permiso'}
              </h3>
              <form onSubmit={handleSavePermission} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nombre del Permiso</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. leer_bitacora"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#131a26] border border-gray-800 text-white focus:outline-none focus:border-amber-500"
                    value={nombrePermiso}
                    onChange={(e) => setNombrePermiso(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Módulo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Seguridad"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#131a26] border border-gray-800 text-white focus:outline-none focus:border-amber-500"
                    value={modulo}
                    onChange={(e) => setModulo(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:bg-gray-900 rounded-xl">
                    Cancelar
                  </button>
                  <button type="submit" className="px-5 py-2 bg-amber-500 text-slate-900 font-semibold rounded-xl hover:bg-amber-600">
                    Guardar
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