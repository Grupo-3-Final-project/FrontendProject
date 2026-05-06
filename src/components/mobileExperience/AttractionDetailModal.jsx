import {
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineInformationCircle,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

const informationItems = [
  { key: 'intensity', label: 'Intensidad', icon: HiOutlineSparkles },
  { key: 'duration', label: 'Duración', icon: HiOutlineClock },
  { key: 'accessibility', label: 'Accesibilidad', icon: HiOutlineUserGroup },
  { key: 'restrictions', label: 'Restricciones', icon: HiOutlineInformationCircle },
]

function AttractionDetailModal({ attraction, isInRoute, onClose, onAddToRoute }) {
  if (!attraction) {
    return null
  }

  return (
    <section
      className="fixed inset-x-0 top-0 bottom-[62px] z-40 mx-auto flex w-full max-w-[430px] flex-col overflow-y-auto bg-black text-neutral-100 shadow-2xl shadow-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby="attraction-detail-title"
    >
      <div className="relative min-h-[190px] overflow-hidden bg-neutral-950">
        <img
          src={attraction.imageUrl}
          alt={attraction.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.18)_42%,#050505_100%)]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute left-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-neutral-900/65 text-white backdrop-blur transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          aria-label="Cerrar detalle de atraccion"
        >
          <HiOutlineArrowLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-neutral-900/65 text-white backdrop-blur transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          aria-label="Guardar atraccion"
        >
          <HiOutlineHeart className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5">
        <div className="-mt-1 flex items-start justify-between gap-3">
          <h2
            id="attraction-detail-title"
            className="text-xl font-black tracking-[0.05em] text-white uppercase"
          >
            {attraction.name}
          </h2>
          <span className="mt-1 rounded-md border border-red-600 bg-red-950/50 px-2.5 py-1 text-[0.58rem] font-black tracking-[0.08em] text-red-500 uppercase">
            {attraction.difficulty}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <article className="rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5">
            <p className="text-[0.56rem] font-bold tracking-[0.08em] text-neutral-500 uppercase">
              Altura mínima
            </p>
            <p className="mt-1 text-sm font-black text-white">{attraction.minimumHeight}</p>
          </article>

          <article className="rounded-lg border border-white/10 bg-neutral-950 px-3 py-2.5">
            <p className="text-[0.56rem] font-bold tracking-[0.08em] text-neutral-500 uppercase">
              Tipo
            </p>
            <p className="mt-1 text-sm font-black text-white">{attraction.type}</p>
          </article>
        </div>

        <p className="mt-5 text-[0.74rem] leading-relaxed text-neutral-300">
          {attraction.description}
        </p>

        <h3 className="mt-5 text-[0.68rem] font-black tracking-[0.12em] text-white uppercase">
          Información
        </h3>

        <div className="mt-2 divide-y divide-white/10">
          {informationItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.key}
                className="grid grid-cols-[auto_5.5rem_minmax(0,1fr)] items-start gap-3 py-3 text-[0.72rem]"
              >
                <Icon className="mt-0.5 h-3.5 w-3.5 text-neutral-500" />
                <span className="text-neutral-500">{item.label}</span>
                <span className="font-medium leading-snug text-neutral-100">
                  {attraction[item.key]}
                </span>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => onAddToRoute(attraction.id)}
          disabled={isInRoute}
          className="mt-auto flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-[0.72rem] font-black tracking-[0.08em] text-white uppercase shadow-[0_18px_34px_rgba(220,38,38,0.28)] transition hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-default disabled:bg-neutral-800 disabled:text-neutral-400 disabled:shadow-none"
        >
          {!isInRoute && <HiOutlinePlus className="h-4 w-4" />}
          {isInRoute ? 'Añadida a mi ruta' : 'Añadir a mi ruta'}
        </button>
      </div>
    </section>
  )
}

export default AttractionDetailModal
