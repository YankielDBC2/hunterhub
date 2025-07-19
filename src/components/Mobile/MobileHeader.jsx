import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Menu, X, ChevronDown, FileText, BookOpen, Wrench,
  Globe, MessageCircle, Send, Twitter, Users
} from 'lucide-react'

const MobileHeader = () => {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const tooltipRef = useRef()
  const menuRef = useRef()

  const [selectedLang, setSelectedLang] = useState(() =>
    (localStorage.getItem('preferredLang') || i18n.language).toUpperCase()
  )

  const allLangs = ['EN', 'ES', 'RU', 'ZH', 'DE', 'FR', 'IT', 'JA', 'KO', 'PT']
  const otherLangs = allLangs.filter((l) => l !== selectedLang)

  const [hcashPrice, setHcashPrice] = useState({ usd: null, ton: null })

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang')?.toLowerCase()
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang)
    }

    const handleClickOutside = (e) => {
      if (!tooltipRef.current?.contains(e.target)) setTooltipOpen(false)
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [i18n])

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.hunterhub.online/api/public/hcash/price')
        const data = await res.json()
        setHcashPrice({ usd: data.usd, ton: data.ton })
      } catch (err) {
        console.warn('Failed to fetch HCASH price:', err.message)
      }
    }

    fetchPrice()
  }, [])

  const handleLangSelect = (lang) => {
    const lower = lang.toLowerCase()
    localStorage.setItem('preferredLang', lower)
    i18n.changeLanguage(lower)
    setSelectedLang(lang)
    setLangOpen(false)
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-black/30 backdrop-blur-md rounded-full px-4 py-2 flex items-center justify-between shadow-lg border border-white/10 lg:hidden">
      {/* Logo + HCASH + Tooltip */}
      <div className="flex items-center gap-3 relative">
        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-red-500">H</span><span className="text-red">UB</span>
        </h1>

        <div
          className="relative flex items-center gap-1 cursor-pointer"
          onClick={() => setTooltipOpen(!tooltipOpen)}
        >
          <img src="/images/HCASH_01.png" alt="HCASH" className="w-5 h-5" />
          <span className="text-sm text-white font-medium">
            {hcashPrice.usd ? `$${hcashPrice.usd.toFixed(4)}` : '...'}
          </span>
          {tooltipOpen && (
            <div
              ref={tooltipRef}
              className="absolute left-0 top-8 bg-black text-white text-sm rounded-md shadow-xl p-3 z-50 w-64 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/tonicon.png" alt="TON" className="w-4 h-4" />
                <span>1 HCASH</span>
                <span className="text-cyan-400 font-bold">
                  {hcashPrice.ton ? `${hcashPrice.ton.toFixed(6)} TON` : '...'}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/HCASH_01.png" alt="USD" className="w-4 h-4" />
                <span>1 HCASH</span>
                <span className="text-green-400 font-bold">
                  {hcashPrice.usd ? `$${hcashPrice.usd.toFixed(4)} USD` : '...'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/sun.png" alt="SOL" className="w-4 h-4" />
                <span>1 HCASH</span>
                <span className="text-yellow-400 font-bold">Soon</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* App + Hamburguesa */}
      <div className="flex items-center gap-2">
        <a
          href="https://t.me/spacehuntersbot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-full text-sm transition shadow"
        >
          {t('header.app')}
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white z-50">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú flotante futurista */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-72 max-h-[75vh] overflow-y-auto bg-black/90 border border-white/10 py-4 px-5 text-sm rounded-2xl shadow-2xl backdrop-blur-xl z-40 space-y-5 scrollbar-thin scrollbar-thumb-white/10"
        >
          {/* Documentación */}
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2 mb-2 uppercase tracking-wider text-xs">
              <FileText className="w-4 h-4 text-white" /> {t('header.docs')}
            </h3>
            <ul className="space-y-2 pl-6 text-white/90">
              <li><a href="#" className="hover:text-teal-400 flex items-center gap-2"><BookOpen size={14} /> {t('header.whitepaper')}</a></li>
              <li><a href="#" className="hover:text-teal-400 flex items-center gap-2"><BookOpen size={14} /> {t('header.lore_bible')}</a></li>
              <li><a href="#" className="hover:text-teal-400 flex items-center gap-2"><Wrench size={14} /> {t('header.dev_notes')}</a></li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2 mb-2 uppercase tracking-wider text-xs">
              <Globe className="w-4 h-4 text-white" /> {t('header.community')}
            </h3>
            <ul className="space-y-2 pl-6 text-white/90">
              <li><a href="#" className="hover:text-teal-400 flex items-center gap-2"><MessageCircle size={14} /> {t('header.discord')}</a></li>
              <li><a href="#" className="hover:text-teal-400 flex items-center gap-2"><Send size={14} /> {t('header.telegram')}</a></li>
              <li><a href="#" className="hover:text-teal-400 flex items-center gap-2"><Twitter size={14} /> {t('header.twitter')}</a></li>
            </ul>
          </div>

          {/* Equipo */}
          <div>
            <a href="#" className="flex items-center gap-2 text-white font-semibold hover:text-teal-400 transition pl-1">
              <Users size={16} /> {t('header.team')}
            </a>
          </div>

          {/* Selector de idioma */}
          <div>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full text-sm transition flex items-center justify-between w-full"
            >
              {selectedLang}
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="mt-2 border border-white/10 rounded-md bg-black/90">
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
        </div>
      )}
    </header>
  )
}

export default MobileHeader
