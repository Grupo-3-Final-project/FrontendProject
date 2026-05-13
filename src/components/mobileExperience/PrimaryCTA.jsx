import { HiOutlineTicket } from 'react-icons/hi2'

function PrimaryCTA({ icon: Icon = HiOutlineTicket, label = 'Comprar entradas', disabled = false, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 text-[0.72rem] font-black tracking-[0.12em] text-white uppercase shadow-[0_18px_34px_rgba(220,38,38,0.28)] transition hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
    >
      <Icon className="text-base" />
      {label}
    </button>
  )
}

export default PrimaryCTA
