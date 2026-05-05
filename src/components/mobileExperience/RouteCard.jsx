import { HiOutlineChevronRight } from 'react-icons/hi2'

function RouteCard() {
  return (
    <section className="rounded-xl border border-red-700/55 bg-neutral-950 px-3.5 py-3 shadow-[0_0_26px_rgba(127,29,29,0.18)]">
      <div className="grid gap-2.5 min-[380px]:grid-cols-[1fr_auto] min-[380px]:items-center">
        <div className="min-w-0">
          <h2 className="text-[0.8rem] leading-tight font-black tracking-[0.08em] text-white uppercase">
            Mi ruta optimizada
          </h2>
          <p className="mt-0.5 text-[0.72rem] leading-snug text-neutral-300">
            4 atracciones - 95 min estimados
          </p>
        </div>

        <button
          type="button"
          className="flex min-h-9 w-full items-center justify-center gap-2 rounded-lg border border-red-600/70 bg-red-950/35 px-3.5 text-[0.68rem] font-black tracking-[0.04em] text-red-300 transition hover:border-red-500 hover:bg-red-900/45 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 min-[380px]:w-auto"
        >
          Ver ruta
          <HiOutlineChevronRight className="text-sm" />
        </button>
      </div>
    </section>
  )
}

export default RouteCard
