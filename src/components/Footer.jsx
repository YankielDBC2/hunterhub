import React from "react";
import {
  FaTwitter,
  FaTelegramPlane,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-glow">
      <div className="footer-horizontal">
        <p className="footer-text">© 2025 Space Hunters. All rights reserved.</p>

        <div className="footer-links">
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            Terms & Conditions
          </a>
        </div>

        <div className="footer-icons">
          <a href="https://x.com/nftspacehunterss" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://t.me/spacehunterss" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane />
          </a>
          <a href="https://discord.gg/spacehunters" target="_blank" rel="noopener noreferrer">
            <FaDiscord />
          </a>
          <a href="https://www.youtube.com/@SpaceHuntersGame" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
