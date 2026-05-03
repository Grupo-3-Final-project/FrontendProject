import logoAmusementPark from '../../assets/logoAmusementPark.png'

function NavbarIdentity() {
  return (
    <div className="flex flex-col items-center px-2 py-4 sm:px-3 sm:py-5 md:px-6 md:py-10">
      <div className="text-center">
        <img className="mx-auto mb" src={logoAmusementPark} alt="Logo del Parque de Atracciones" />
        <h2 className="text-[1rem] leading-tight font-black tracking-normal text-white sm:text-sm md:text-xl md:tracking-tighter">
          La Ultima <br /> <span className="text-red-600">Puerta</span>
        </h2>
        <p className="mt-2 text-[0.56rem] leading-tight font-bold tracking-normal text-gray-500 uppercase sm:text-[0.62rem] md:text-[10px] md:tracking-[0.2em]">
          Te atreves a cruzarla
        </p>
      </div>
    </div>
  )
}

export default NavbarIdentity
