function NavbarIdentity() {
  return (
    <div className="flex flex-col items-center py-10 px-6">
      <div className="w-16 h-16 mb-4 border-2 border-red-600 rounded-lg flex items-center justify-center bg-black shadow-[0_0_15px_rgba(220,38,38,0.3)]">
        <span className="text-red-600 text-4xl">⛩</span>
      </div>
      <div className="text-center">
        <h2 className="text-white font-black text-xl tracking-tighter leading-none">
          PUERTA DEL <br /> <span className="text-red-600">ABISMO</span>
        </h2>
        <p className="text-[10px] text-gray-500 tracking-[0.2em] mt-2 font-bold uppercase">Atrévete a cruzar</p>
      </div>
    </div>
  );
}
export default NavbarIdentity;
