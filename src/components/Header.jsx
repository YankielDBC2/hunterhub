import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 hover:text-teal-400 transition">
        {title}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-black/80 border border-white/10 backdrop-blur-lg rounded-md shadow-lg z-50">
          <ul className="py-2 text-sm">
            {items.map((item, i) => (
              <li key={i}>
                <a
                  href={item.link}
                  className="block px-4 py-2 hover:bg-white/10 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const docsItems = [
    { label: 'Whitepaper', link: '#' },
    { label: 'Lore Bible', link: '#' },
    { label: 'Dev Notes', link: '#' },
  ];

  const communityItems = [
    { label: 'Discord', link: '#' },
    { label: 'Telegram', link: '#' },
    { label: 'Twitter', link: '#' },
  ];

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-black/30 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-lg border border-white/10">
      <h1 className="text-2xl font-bold tracking-wide">
        <span className="text-red-500">H</span><span className="text-red">UB</span> 
      </h1>

      <nav className="flex items-center space-x-6 text-sm">
        <Dropdown title="Docs" items={docsItems} />
        <Dropdown title="Community" items={communityItems} />
        <a href="#" className="hover:text-teal-400 transition">Team</a>
        <a
          href="https://t.me/spacehuntersbot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1.5 rounded-full text-sm transition shadow"
        >
          🚀 App
        </a>
      </nav>
    </header>
  );
};

export default Header;
