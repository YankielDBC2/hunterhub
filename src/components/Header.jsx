import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(() => {
    const saved = localStorage.getItem('preferredLang');
    return saved ? saved.toUpperCase() : i18n.language.toUpperCase();
  });
  const [langOpen, setLangOpen] = useState(false);
  const timeoutRef = useRef(null);
  const [forceRerender, setForceRerender] = useState(0); // 🔁 para forzar re-render

  const allLangs = ['EN', 'ES', 'RU', 'ZH', 'DE', 'FR', 'IT', 'JA', 'KO', 'PT'];
  const otherLangs = allLangs.filter((l) => l !== selectedLang);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang')?.toLowerCase();
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang).then(() => {
        setForceRerender((prev) => prev + 1); // ✅ re-render al cargar idioma
      });
    }
  }, [i18n]);

  const handleLangEnter = () => {
    clearTimeout(timeoutRef.current);
    setLangOpen(true);
  };

  const handleLangLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setLangOpen(false);
    }, 200);
  };

  const handleLangSelect = (lang) => {
    const lowerLang = lang.toLowerCase();
    localStorage.setItem('preferredLang', lowerLang);
    i18n.changeLanguage(lowerLang).then(() => {
      setSelectedLang(lang);
      setLangOpen(false);
      setForceRerender((prev) => prev + 1); // ✅ re-render tras cambio de idioma
    });
  };

  const docsItems = [
    { label: t('header.whitepaper'), link: '#' },
    { label: t('header.lore_bible'), link: '#' },
    { label: t('header.dev_notes'), link: '#' },
  ];

  const communityItems = [
    { label: t('header.discord'), link: '#' },
    { label: t('header.telegram'), link: '#' },
    { label: t('header.twitter'), link: '#' },
  ];

  return (
    <header key={forceRerender} className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-black/30 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-lg border border-white/10">
      {/* Logo + HCASH */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-red-500">H</span>
          <span className="text-red">UB</span>
        </h1>
        <div className="flex items-center gap-2">
          <img src="/images/HCASH_01.png" alt="HCASH" className="w-5 h-5" />
          <span className="text-white text-sm font-semibold">{t('header.hcash_price')}</span>
        </div>
      </div>

      {/* Nav + Language Selector */}
      <nav className="flex items-center space-x-6 text-sm">
        <Dropdown title={t('header.docs')} items={docsItems} />
        <Dropdown title={t('header.community')} items={communityItems} />
        <a href="#" className="hover:text-teal-400 transition">{t('header.team')}</a>
        <a
          href="https://t.me/spacehuntersbot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1.5 rounded-full text-sm transition shadow"
        >
          {t('header.app')}
        </a>

        {/* Language Selector */}
        <div
          className="relative"
          onMouseEnter={handleLangEnter}
          onMouseLeave={handleLangLeave}
        >
          <button
            onClick={() => setLangOpen((prev) => !prev)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-full text-sm transition flex items-center gap-1"
          >
            {selectedLang}
            <ChevronDown size={14} />
          </button>

          {langOpen && (
            <div className="absolute right-0 bg-black/90 border border-white/10 mt-2 rounded-md shadow-lg z-50">
              {otherLangs.map((lang) => (
                <div
                  key={lang}
                  onClick={() => handleLangSelect(lang)}
                  className="px-4 py-2 text-white text-sm hover:bg-white/10 cursor-pointer"
                >
                  {t(`header.language_selector.${lang}`, lang)}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
