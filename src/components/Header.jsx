import { motion } from 'framer-motion';
import { BookOpen, Users, Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black/80 via-[#0f0f1c]/80 to-black/80 backdrop-blur border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 font-bold tracking-wide text-xl"
        >
          <span className="text-red-500">H</span><span>U</span><span className="text-white">B</span>
          <span className="ml-2 text-sm font-light text-white-400">Space Hunters</span>
        </motion.div>

        {/* Nav */}
        <nav className="flex gap-6 text-sm items-center">
          <a href="#docs" className="hover:text-red-500 transition flex items-center gap-1">
            <BookOpen size={16} /> Docs
          </a>
          <a href="#Community" className="hover:text-red-500 transition flex items-center gap-1">
            <Users size={16} /> Community
          </a>
          <a href="#Team" className="hover:text-red-500 transition flex items-center gap-1">
            Team
          </a>
          <a
            href="#app"
            className="ml-2 bg-red-600 hover:bg-red-700 transition text-sm px-4 py-2 rounded-full font-bold shadow-md flex items-center gap-1"
          >
            <Rocket size={16} /> App
          </a>
        </nav>
      </div>

      {/* Línea de energía */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-pink-500 to-purple-500 animate-pulse" />
    </header>
  );
}
