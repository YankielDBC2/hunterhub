import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#15121d] text-white px-4 py-3 flex items-center justify-between shadow-md">
      {/* Logo reducido a HUB */}
      <div className="text-xl font-extrabold">HUB</div>

      {/* Botones importantes visibles */}
      <div className="flex items-center gap-3">
        <button className="bg-red-600 px-4 py-1.5 rounded text-sm font-semibold">Community</button>
        <button className="border border-red-500 text-red-500 px-4 py-1.5 rounded text-sm font-semibold">App</button>
        <button onClick={toggleMenu} className="ml-2">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú desplegable */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#1c1a26] border-t border-white/10 shadow-lg">
          <ul className="flex flex-col py-3 text-sm">
            <li className="px-4 py-2 hover:bg-white/5">Docs</li>
            <li className="px-4 py-2 hover:bg-white/5">Guides</li>
            <li className="px-4 py-2 hover:bg-white/5">Social</li>
            <li className="px-4 py-2 hover:bg-white/5">News Channel</li>
            <li className="px-4 py-2 hover:bg-white/5">About Us</li>
          </ul>
        </nav>
      )}
    </header>
  );
}
