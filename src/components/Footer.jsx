import { FaTwitter, FaTelegramPlane, FaDiscord, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer
      className="relative text-white py-12 bg-[#181622] overflow-hidden"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Humo animado */}
      <div className="footer-smoke" />

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-400">© 2025 Space Hunters. All rights reserved.</p>
          <div className="flex gap-6 text-xl">
            <a href="#" className="hover:text-red-500" title="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-red-500" title="Telegram"><FaTelegramPlane /></a>
            <a href="#" className="hover:text-red-500" title="Discord"><FaDiscord /></a>
            <a href="#" className="hover:text-red-500" title="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
