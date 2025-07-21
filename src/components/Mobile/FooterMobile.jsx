import { FaTwitter, FaTelegramPlane, FaDiscord, FaYoutube } from 'react-icons/fa';
import './FooterMobile.css'; // Sigue importando si usas estilos personalizados

const FooterMobile = () => {
  return (
    <div className="relative z-20 -mt-40">
      <footer className="footer-background text-white py-10 overflow-hidden">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs text-gray-300 font-light">
            © 2025 Space Hunters. All rights reserved.
          </p>
          <div className="flex gap-6 text-xl">
            <a href="#" className="footer-icon" title="Twitter"><FaTwitter /></a>
            <a href="#" className="footer-icon" title="Telegram"><FaTelegramPlane /></a>
            <a href="#" className="footer-icon" title="Discord"><FaDiscord /></a>
            <a href="#" className="footer-icon" title="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterMobile;
