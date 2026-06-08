import { useState } from 'react';
import { PermissionsView } from './pages/PermissionsView';
import { RolesView } from './pages/RolesPage';

type Page = 'home' | 'permissions' | 'roles';

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="sticky top-0 z-50 bg-slate-950/95 border-b border-slate-900 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-bold text-slate-950 shadow-xl shadow-amber-500/20">
              UC
            </div>
            <div>
              <p className="text-base font-bold tracking-tight text-white">UNAH Conecta</p>
              <p className="text-xs uppercase text-amber-400 tracking-[0.2em]">Seguridad y permisos</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setPage('home')}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${page === 'home' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              Inicio
            </button>
            <button
              onClick={() => setPage('roles')}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${page === 'roles' ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              👥 Roles
            </button>
            <button
              onClick={() => setPage('permissions')}
              className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${page === 'permissions' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
            >
              🔑 Permisos
            </button>
          </div>
        </div>
      </nav>

      <main className="pb-16">
        {page === 'home' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="rounded-[2rem] border border-slate-900 bg-slate-950/90 p-10 shadow-2xl shadow-slate-950/40">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-amber-400 uppercase text-xs tracking-[0.3em] mb-4">Bienvenido</p>
                  <h1 className="text-5xl font-black text-white mb-4">Seguridad y permisos para tu equipo</h1>
                  <p className="text-slate-400 text-lg leading-8">
                    En UNAH Conecta puedes administrar roles, permisos y acceso de forma sencilla. Avanza en tu trabajo con módulos claros y con el apoyo de una interfaz moderna.
                  </p>
                </div>
                <div className="rounded-3xl border border-slate-900 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Estado general</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                      <span className="text-slate-200">Roles</span>
                      <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase text-white">Listo</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                      <span className="text-slate-200">Permisos</span>
                      <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold uppercase text-slate-950">Listo</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                      <span className="text-slate-200">Usuarios</span>
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase text-slate-300">En desarrollo</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-950/80 px-4 py-3">
                      <span className="text-slate-200">Auditoría</span>
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase text-slate-300">En desarrollo</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <article className="rounded-[1.75rem] border border-slate-900 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">👥 Roles</h2>
                    <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold uppercase text-white">Operativo</span>
                  </div>
                  <p className="text-slate-400 mb-6">
                    Define qué puede hacer cada usuario. Crea, edita y elimina roles con nombre y descripción, y asigna permisos según tus necesidades.
                  </p>
                  <button
                    onClick={() => setPage('roles')}
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition"
                  >
                    Ver Roles
                  </button>
                </article>
                <article className="rounded-[1.75rem] border border-slate-900 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">🔑 Permisos</h2>
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold uppercase text-slate-950">Operativo</span>
                  </div>
                  <p className="text-slate-400 mb-6">
                    Controla las acciones disponibles para cada rol. Agrega permisos por módulo y mantén el acceso seguro y ordenado.
                  </p>
                  <button
                    onClick={() => setPage('permissions')}
                    className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition"
                  >
                    Ver Permisos
                  </button>
                </article>
                <article className="rounded-[1.75rem] border border-slate-900 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 opacity-90">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">👤 Usuarios</h2>
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase text-slate-300">Próximamente</span>
                  </div>
                  <p className="text-slate-400">
                    Próximo módulo para gestionar usuarios activos, sus perfiles y los roles asignados en la plataforma.
                  </p>
                </article>
                <article className="rounded-[1.75rem] border border-slate-900 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/20 opacity-90">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">📊 Auditoría</h2>
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase text-slate-300">Próximamente</span>
                  </div>
                  <p className="text-slate-400">
                    En desarrollo: registro de eventos y análisis de seguridad para revisar cambios en roles y permisos.
                  </p>
                </article>
              </div>
            </div>
          </section>
        )}

        {page === 'roles' && <RolesView />}
        {page === 'permissions' && <PermissionsView />}
      </main>
    </div>
  );
}

export default App;
