import {
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineInformationCircle,
  HiOutlinePlus,
  HiOutlineShieldExclamation,
  HiOutlineUserGroup,
} from 'react-icons/hi2'

function AttractionModal({ attraction, onClose }) {
  if (!attraction) {
    return null
  }

  const {
    category,
    description,
    image,
    info = {},
    minHeight,
    name,
    type,
    waitTime,
  } = attraction

  return (
    <div className="absolute inset-0 z-40 overflow-y-auto bg-neutral-950 text-white">
      <article className="min-h-full bg-neutral-950">
        <div className="relative h-44 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_50%_10%,rgba(220,38,38,0.48),rgba(10,10,10,0.92)_58%,rgba(0,0,0,1)_100%)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-neutral-950" />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:border-red-500/70 hover:text-red-300"
              onClick={onClose}
              aria-label="Volver al mapa"
            >
              <HiOutlineArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:border-red-500/70 hover:text-red-300"
              aria-label="Guardar atraccion"
            >
              <HiOutlineHeart className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-5 px-4 pb-5">
          <div className="flex items-end justify-between gap-3">
            <h2 className="max-w-[12rem] text-xl font-black uppercase leading-tight text-white">{name}</h2>
            <span className="rounded-md border border-red-500 bg-red-950/60 px-3 py-1 text-[0.65rem] font-black uppercase text-red-400">
              {category ?? 'Atraccion'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FeatureBox label="Altura minima" value={minHeight} />
            <FeatureBox label="Tipo" value={type} />
          </div>

          <p className="text-[0.78rem] leading-6 text-stone-300">{description}</p>

          <section>
            <h3 className="mb-3 text-[0.7rem] font-black uppercase tracking-wider text-white">
              Informacion
            </h3>
            <div className="divide-y divide-white/10 border-b border-white/10">
              <InfoRow icon={HiOutlineShieldExclamation} label="Intensidad" value={info.intensity} />
              <InfoRow icon={HiOutlineClock} label="Duracion" value={info.duration} />
              <InfoRow icon={HiOutlineUserGroup} label="Accesibilidad" value={info.accessibility} />
              <InfoRow icon={HiOutlineInformationCircle} label="Restricciones" value={info.restrictions} />
              <InfoRow icon={HiOutlineClock} label="Espera" value={`${waitTime} min`} />
            </div>
          </section>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-red-600 text-[0.72rem] font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/40 transition hover:bg-red-500"
          >
            <HiOutlinePlus className="h-4 w-4" />
            AÑADIR A MI RUTA
          </button>
        </div>
      </article>
    </div>
  )
}

function FeatureBox({ label, value }) {
  if (!value) {
    return null
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <p className="text-[0.58rem] font-medium text-stone-500">{label}</p>
      <p className="mt-1 text-sm font-black text-stone-100">{value}</p>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  if (!value) {
    return null
  }

  return (
    <div className="grid grid-cols-[1rem_5rem_1fr] items-start gap-3 py-3 text-[0.68rem]">
      <Icon className="mt-0.5 h-3.5 w-3.5 text-stone-600" />
      <dt className="text-stone-500">{label}</dt>
      <dd className="leading-5 text-stone-100">{value}</dd>
    </div>
  )
}

export default AttractionModal
