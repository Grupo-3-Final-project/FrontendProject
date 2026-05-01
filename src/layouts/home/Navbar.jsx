import {useState} from "react";
import {navItems} from "./navData";
import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";

function Navbar() {
  const [activeId, setActiveId] = useState("inicio");

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col">
      <SidebarLogo />

      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem key={item.id} item={item} isActive={activeId === item.id} onClick={setActiveId} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;
