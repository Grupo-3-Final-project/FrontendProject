import logoAmusementPark from '../../assets/logoAmusementPark.png'

function NavbarIdentity() {
  return (
    <div className="flex flex-col items-center px-6 py-10">
      <div className="text-center">
        <img src={logoAmusementPark} alt="" />
        <h2 className="text-xl leading-none font-black tracking-tighter text-white">
          La Última <br /> <span className="text-red-600">Puerta</span>
        </h2>
        <p className="mt-2 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
          ¿Te atreves a cruzarla?
        </p>
      </div>
    </div>
  )
}

export default NavbarIdentity
