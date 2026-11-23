import { useState } from 'react'

// Datos de ejemplo
const INCIDENCIAS_INICIALES = [
  {
    id: 'INC-101',
    titulo: 'Fallo de enlace en Switch Rack B',
    ubicacion: 'Aula 204 - Redes',
    descripcion: 'Pérdida intermitente de paquetes en los puertos 12 al 16.',
    prioridad: 'alta',
    estado: 'pendiente',
    hora: '09:15',
  },
  {
    id: 'INC-102',
    titulo: 'Actualización de imágenes Docker',
    ubicacion: 'Laboratorio DAM 2',
    descripcion: 'Desplegar la imagen base Node 22 en los equipos.',
    prioridad: 'media',
    estado: 'pendiente',
    hora: '10:30',
  },
  {
    id: 'INC-103',
    titulo: 'Calibración de proyector láser',
    ubicacion: 'Aula Magna',
    descripcion: 'Ajuste trapezoidal y revisar la entrada HDMI.',
    prioridad: 'baja',
    estado: 'resuelta',
    hora: 'Ayer',
  },
  {
    id: 'INC-104',
    titulo: 'Impresora sin conexión',
    ubicacion: 'Secretaría',
    descripcion: 'La impresora no aparece en la red desde esta mañana.',
    prioridad: 'media',
    estado: 'pendiente',
    hora: '11:05',
  },
]

// Colores de la etiqueta según la prioridad
const COLOR_PRIORIDAD = {
  alta: 'bg-red-100 text-red-700',
  media: 'bg-amber-100 text-amber-700',
  baja: 'bg-emerald-100 text-emerald-700',
}

function Home() {
  const [incidencias, setIncidencias] = useState(INCIDENCIAS_INICIALES)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todas')
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [formAbierto, setFormAbierto] = useState(false)

  // Campos del formulario
  const [titulo, setTitulo] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [prioridad, setPrioridad] = useState('media')

  // Contadores
  const total = incidencias.length
  const pendientes = incidencias.filter((i) => i.estado === 'pendiente').length
  const resueltas = incidencias.filter((i) => i.estado === 'resuelta').length
  const criticas = incidencias.filter(
    (i) => i.estado === 'pendiente' && i.prioridad === 'alta'
  ).length

  // Filtrar por estado y por texto
  const lista = incidencias.filter((i) => {
    const coincideEstado = filtro === 'todas' || i.estado === filtro
    const texto = busqueda.toLowerCase()
    const coincideTexto =
      i.titulo.toLowerCase().includes(texto) ||
      i.ubicacion.toLowerCase().includes(texto) ||
      i.id.toLowerCase().includes(texto)
    return coincideEstado && coincideTexto
  })

  const cambiarEstado = (id) => {
    setIncidencias(
      incidencias.map((i) =>
        i.id === id
          ? { ...i, estado: i.estado === 'pendiente' ? 'resuelta' : 'pendiente' }
          : i
      )
    )
  }

  const borrar = (id) => {
    setIncidencias(incidencias.filter((i) => i.id !== id))
  }

  const crearIncidencia = (e) => {
    e.preventDefault()
    if (!titulo.trim() || !ubicacion.trim()) return

    const nueva = {
      id: `INC-${100 + incidencias.length + Math.floor(Math.random() * 900)}`,
      titulo,
      ubicacion,
      descripcion: 'Sin observaciones.',
      prioridad,
      estado: 'pendiente',
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    }
    setIncidencias([nueva, ...incidencias])
    setTitulo('')
    setUbicacion('')
    setPrioridad('media')
    setFormAbierto(false)
  }

  const kpis = [
    { nombre: 'Total', valor: total, color: 'text-blue-600' },
    { nombre: 'Pendientes', valor: pendientes, color: 'text-amber-600' },
    { nombre: 'Críticas', valor: criticas, color: 'text-red-600' },
    { nombre: 'Resueltas', valor: resueltas, color: 'text-emerald-600' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* CABECERA */}
      <header className="bg-blue-600 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-bold md:text-xl">SmartLab Monitor</h1>

          {/* Menú en tablet y escritorio */}
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#" className="hover:underline">Inicio</a>
            <a href="#incidencias" className="hover:underline">Incidencias</a>
            <a href="#" className="hover:underline">Aulas</a>
            <a href="#" className="hover:underline">Perfil</a>
          </nav>

          {/* Botón hamburguesa en móvil */}
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="rounded p-2 text-2xl leading-none md:hidden"
            aria-label="Abrir menú"
          >
            {menuAbierto ? '✕' : '☰'}
          </button>
        </div>

        {/* Menú desplegable en móvil */}
        {menuAbierto && (
          <nav className="flex flex-col border-t border-blue-500 px-4 pb-3 md:hidden">
            <a href="#" className="py-2">Inicio</a>
            <a href="#incidencias" className="py-2">Incidencias</a>
            <a href="#" className="py-2">Aulas</a>
            <a href="#" className="py-2">Perfil</a>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        {/* INTRO */}
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Panel de incidencias</h2>
            <p className="mt-1 text-slate-500">
              Controla las incidencias de las aulas del centro.
            </p>
          </div>
          <button
            onClick={() => setFormAbierto(true)}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 md:w-auto"
          >
            + Nueva incidencia
          </button>
        </section>

        {/* KPIs: 2 columnas en móvil, 4 en tablet/escritorio */}
        <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.nombre} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-500">{kpi.nombre}</p>
              <p className={`mt-1 text-3xl font-bold ${kpi.color}`}>{kpi.valor}</p>
            </div>
          ))}
        </section>

        {/* BUSCADOR Y FILTROS */}
        <section className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Buscar por código, título o aula..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
          />
          <div className="flex gap-2">
            {['todas', 'pendiente', 'resuelta'].map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium capitalize sm:flex-none ${
                  filtro === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-300'
                }`}
              >
                {f === 'todas' ? 'Todas' : f + 's'}
              </button>
            ))}
          </div>
        </section>

        {/* LISTADO: 1 columna móvil, 2 tablet, 3 escritorio */}
        <section id="incidencias">
          <h3 className="mb-3 text-sm font-bold uppercase text-slate-500">
            Incidencias ({lista.length})
          </h3>

          {lista.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
              No hay incidencias con ese filtro.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {lista.map((inc) => (
                <article key={inc.id} className="flex flex-col rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-blue-600">{inc.id}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${COLOR_PRIORIDAD[inc.prioridad]}`}>
                      {inc.prioridad}
                    </span>
                  </div>

                  <h4 className={`mt-2 font-semibold ${inc.estado === 'resuelta' ? 'text-slate-400 line-through' : ''}`}>
                    {inc.titulo}
                  </h4>
                  <p className="mt-1 flex-1 text-sm text-slate-500">{inc.descripcion}</p>

                  <p className="mt-3 text-xs text-slate-500">
                    📍 {inc.ubicacion} · {inc.hora}
                  </p>

                  <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                    <button
                      onClick={() => cambiarEstado(inc.id)}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium ${
                        inc.estado === 'resuelta'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {inc.estado === 'resuelta' ? '✓ Resuelta' : 'Pendiente'}
                    </button>
                    <button
                      onClick={() => borrar(inc.id)}
                      className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      Borrar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* PIE */}
      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        <p>SmartLab Monitor · Desarrollo de Interfaces</p>
        {/* Indicador para comprobar el RWD */}
        <p className="mt-1 text-xs">
          Vista:{' '}
          <span className="font-semibold md:hidden">Móvil</span>
          <span className="hidden font-semibold md:inline lg:hidden">Tablet</span>
          <span className="hidden font-semibold lg:inline">Escritorio</span>
        </p>
      </footer>

      {/* FORMULARIO NUEVA INCIDENCIA */}
      {formAbierto && (
        <div className="fixed inset-0 flex items-end justify-center bg-black/40 sm:items-center">
          <form
            onSubmit={crearIncidencia}
            className="w-full rounded-t-2xl bg-white p-6 sm:max-w-md sm:rounded-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Nueva incidencia</h3>
              <button type="button" onClick={() => setFormAbierto(false)} className="text-xl" aria-label="Cerrar">
                ✕
              </button>
            </div>

            <label className="mb-1 block text-sm font-medium">Título *</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2"
            />

            <label className="mb-1 block text-sm font-medium">Aula o ubicación *</label>
            <input
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
              className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2"
            />

            <label className="mb-1 block text-sm font-medium">Prioridad</label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="mb-5 w-full rounded-lg border border-slate-300 px-3 py-2"
            >
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>

            <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
              Guardar
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Home
