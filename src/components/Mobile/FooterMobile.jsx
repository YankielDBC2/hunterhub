import { FaTwitter, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import './FooterMobile.css';

const FooterMobile = () => {
  return (
    <div className="relative z-20 -mt-40">
      <footer className="footer-background text-white py-10 overflow-hidden">
        <div className="max-w-md mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs text-gray-300 font-light">
            © 2021-2025 Space Heroes Holdings LLC. All rights reserved.
          </p>
          <div className="flex gap-6 text-xl">
            <a
              href="https://x.com/nftspacehunterss"
              className="footer-icon"
              title="X (formerly Twitter)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://t.me/spacehunterss"
              className="footer-icon"
              title="Telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://www.youtube.com/@SpaceHuntersGame"
              className="footer-icon"
              title="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterMobile;
