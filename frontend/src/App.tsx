<<<<<<< Updated upstream
import { useState, useEffect } from 'react';

interface HealthReport {
  status: string;
  database: {
    connected: boolean;
    databaseName: string;
    currentUser: string;
    timestamp: string;
  };
  server: {
    uptime: number;
    timestamp: string;
  };
}

function App() {
  const [report, setReport] = useState<HealthReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      // Backend corre en el puerto 5000
      const response = await fetch('http://localhost:5000/api/health');
      if (!response.ok) {
        throw new Error('El servidor de backend respondió con un error.');
      }
      const data = await response.json();
      setReport(data);
    } catch (err: any) {
      setError(err.message || 'No se pudo conectar al backend.');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navbar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-amber-500/20 text-xl tracking-wider">
              UC
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-yellow-200 to-white bg-clip-text text-transparent">
                UNAH Conecta
              </span>
              <span className="block text-[10px] text-amber-500 font-mono tracking-widest uppercase">
                Puma Conecta v1.0
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${report?.status === 'OK' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
              Clean Architecture
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6">
            ¡Proyecto Inicializado con <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Éxito!</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Tu proyecto full-stack se ha configurado bajo las directrices de una arquitectura limpia. El frontend en React + Vite + TypeScript + Tailwind CSS se comunica con tu servidor en Node.js + Express + PostgreSQL.
          </p>
        </div>

        {/* Status Dashboard Section */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card: Database Status */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-3xl p-8 transition-all duration-300 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-amber-500 mb-6">
              Estado de la Base de Datos
            </h3>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-slate-800 rounded w-2/3"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <span className="text-2xl">⚠️</span>
                  <span className="font-semibold">Error de Conexión</span>
                </div>
                <p className="text-sm text-slate-500">{error}</p>
              </div>
            ) : report?.database.connected ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xl font-bold text-emerald-400">Conectada exitosamente</span>
                </div>
                <div className="border-t border-slate-800/80 pt-4 space-y-2 text-sm text-slate-400">
                  <div className="flex justify-between font-mono">
                    <span>Base de Datos:</span>
                    <span className="text-white font-bold">{report.database.databaseName}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Usuario:</span>
                    <span className="text-slate-300">{report.database.currentUser}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Render Host:</span>
                    <span className="text-slate-300 text-xs">virginia-postgres.render</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <span className="text-2xl">❌</span>
                  <span className="font-semibold">Desconectada</span>
                </div>
              </div>
            )}
          </div>

          {/* Card: API Server Status */}
          <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded-3xl p-8 transition-all duration-300 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-blue-400 mb-6">
              Servidor Backend (Express)
            </h3>

            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-slate-800 rounded w-2/3"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <span className="text-2xl">🔌</span>
                  <span className="font-semibold">Backend Inalcanzable</span>
                </div>
                <p className="text-sm text-slate-400">
                  Asegúrate de haber iniciado el servidor backend con <code className="bg-slate-950 px-2 py-1 rounded text-red-300 font-mono text-xs">npm run dev</code> en la carpeta de backend.
                </p>
              </div>
            ) : report ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xl font-bold text-white">Activo y Respondiendo</span>
                </div>
                <div className="border-t border-slate-800/80 pt-4 space-y-2 text-sm text-slate-400">
                  <div className="flex justify-between font-mono">
                    <span>Uptime:</span>
                    <span className="text-slate-300 font-bold">{Math.round(report.server.uptime)}s</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Puerto del Servidor:</span>
                    <span className="text-slate-300">5000</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span>Hora del Servidor:</span>
                    <span className="text-slate-400 text-xs">{new Date(report.server.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <span>🔄</span>
            )}
            Probar Conexión Nuevamente
          </button>
=======
import { useState } from 'react';
import RolesPage from './pages/RolesPage';
import { PermissionsView } from './pages/PermissionsView'; // Asegúrate de tener este archivo en src/pages

// Estado de navegación sin librerías extras
type Page = 'home' | 'roles' | 'permissions';

function App() {
  const [page, setPage] = useState<Page>('home');

  return (
    <div>
      {/* ── Barra de navegación global ────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-[200] bg-slate-950 border-b border-slate-800 h-14 flex items-center px-6 gap-6">
        <div className="flex items-center gap-2 mr-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-black text-slate-950 text-xs">UC</div>
          <span className="font-black text-base bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">UNAH Conecta</span>
        </div>
        
        <button
          onClick={() => setPage('home')}
          className={`text-sm font-semibold px-3 py-1 rounded-lg transition-all cursor-pointer
            ${page === 'home' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}
        >
          🏠 Inicio
        </button>
        
        <button
          onClick={() => setPage('roles')}
          className={`text-sm font-semibold px-3 py-1 rounded-lg transition-all cursor-pointer
            ${page === 'roles' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}
        >
          🔐 Roles
        </button>

        <button
          onClick={() => setPage('permissions')}
          className={`text-sm font-semibold px-3 py-1 rounded-lg transition-all cursor-pointer
            ${page === 'permissions' ? 'bg-amber-500/15 text-amber-400' : 'text-slate-400 hover:text-white'}`}
        >
          🔑 Permisos
        </button>
      </nav>

      {/* ── Renderizado Dinámico de Páginas ───────────────────────── */}
      <div className="pt-14">
        {page === 'roles' && <RolesPage />}
        {page === 'permissions' && <PermissionsView />}
        {page === 'home' && <HomePage onNavigate={setPage} />}
      </div>
    </div>
  );
}

// ── Página de Inicio ─────────────────────────────────────────────────────────────
function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-16 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-black text-center mb-4">
          Módulo de <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Seguridad</span>
        </h1>
        <p className="text-slate-400 text-center max-w-xl mb-12">
          Selecciona un módulo del sistema de seguridad del portal UNAH Conecta.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-3xl">
          {[
            { icon: '👑', label: 'Roles',      desc: 'Define los roles del sistema',            page: 'roles' as Page,       ready: true },
            { icon: '🔑', label: 'Permisos',   desc: 'Asigna permisos por rol',                 page: 'permissions' as Page, ready: true }, // 👈 Aquí quedó incorporado el cambio
            { icon: '📋', label: 'Bitácora',   desc: 'Registro de actividad del sistema',       page: 'home' as Page,        ready: false },
            { icon: '👤', label: 'Usuarios',   desc: 'Gestión de cuentas de usuario',           page: 'home' as Page,        ready: false },
            { icon: '💾', label: 'Respaldos',  desc: 'Historial de backups de la base de datos',page: 'home' as Page,        ready: false },
            { icon: '🛡️', label: 'ACL / RBAC', desc: 'Control de acceso por listas y roles',   page: 'home' as Page,        ready: false },
          ].map(m => (
            <button
              key={m.label}
              onClick={() => m.ready && onNavigate(m.page)}
              className={`relative bg-slate-900 border rounded-2xl p-6 text-left transition-all
                ${m.ready
                  ? 'border-amber-500/30 hover:border-amber-500/60 cursor-pointer hover:bg-slate-900/80'
                  : 'border-slate-800 opacity-50 cursor-not-allowed'}`}
            >
              {!m.ready && (
                <span className="absolute top-3 right-3 text-[9px] bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full font-mono">PRÓXIMO</span>
              )}
              {m.ready && (
                <span className="absolute top-3 right-3 text-[9px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-mono">LISTO</span>
              )}
              <span className="text-3xl mb-3 block">{m.icon}</span>
              <h3 className="font-bold text-white mb-1">{m.label}</h3>
              <p className="text-xs text-slate-400">{m.desc}</p>
            </button>
          ))}
>>>>>>> Stashed changes
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600">
        <p>© 2026 UNAH Conecta. Universidad Nacional Autónoma de Honduras.</p>
        <p className="mt-1 font-mono">Clean Architecture Design Patterns & Clean Code.</p>
      </footer>
    </div>
  );
}

export default App;