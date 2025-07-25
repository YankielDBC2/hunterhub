import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Menu,
  X,
  ChevronDown,
  FileText,
  Wrench,
  Globe,
  MessageCircle,
  Send,
  Play,
  Newspaper,
  Users,
} from 'lucide-react'

const HeaderTablet = () => {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const tooltipRef = useRef()
  const menuRef = useRef()

  const [selectedLang, setSelectedLang] = useState(() =>
    (localStorage.getItem('preferredLang') || i18n.language).toUpperCase()
  )

  const [priceUsd, setPriceUsd] = useState('0.0000')
  const [priceTon, setPriceTon] = useState('0.000000')

  const allLangs = ['EN', 'ES', 'RU', 'ZH', 'DE', 'FR', 'IT', 'JA', 'KO', 'PT']
  const otherLangs = allLangs.filter((l) => l !== selectedLang)

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

  const handleLangSelect = (lang) => {
    const lower = lang.toLowerCase()
    localStorage.setItem('preferredLang', lower)
    i18n.changeLanguage(lower)
    setSelectedLang(lang)
    setLangOpen(false)
  }

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(`https://corsproxy.io/?https://api.hunterhub.online/api/public/hcash/price`)
        const json = await res.json()
        setPriceUsd(json.data?.usd?.toFixed(4) || '0.0000')
        setPriceTon(json.data?.ton?.toFixed(6) || '0.000000')
      } catch (err) {
        console.error('Failed to fetch HCASH price:', err)
      }
    }

    fetchPrice()
  }, [])

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-black/30 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-lg border border-white/10 hidden md:flex lg:hidden">
      {/* Logo + HCASH + Tooltip */}
      <div className="flex items-center gap-4 relative">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-red-500">H</span>
          <span className="text-red">UB</span>
        </h1>

        <div
          className="relative flex items-center gap-2 cursor-pointer"
          onClick={() => setTooltipOpen(!tooltipOpen)}
        >
          <img src="/images/HCASH_01.png" alt="HCASH" className="w-6 h-6" />
          <span className="text-base text-white font-medium">${priceUsd}</span>

          {tooltipOpen && (
            <div
              ref={tooltipRef}
              className="absolute left-0 top-10 bg-black text-white text-sm rounded-md shadow-xl p-3 z-50 w-64 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/ton_icon.png" alt="TON" className="w-4 h-4" />
                <span>1 HCASH</span>
                <span className="text-cyan-400 font-bold">{priceTon} TON</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <img src="/images/sun.png" alt="SOL" className="w-4 h-4" />
                <span>1 HCASH</span>
                <span className="text-yellow-400 font-bold">soon</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/ron_icon.png" alt="RON" className="w-4 h-4" />
                <span>1 HCASH</span>
                <span className="text-blue-400 font-bold">soon</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* App + Menú hamburguesa */}
      <div className="flex items-center gap-4">
        <a
          href="https://t.me/spacehuntersbot"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full text-sm transition shadow"
        >
          {t('header.app')}
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white z-50">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Menú flotante */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-80 max-h-[75vh] overflow-y-auto bg-black/90 border border-white/10 py-4 px-6 text-sm rounded-2xl shadow-2xl backdrop-blur-xl z-40 space-y-5 scrollbar-thin scrollbar-thumb-white/10"
        >
          {/* Docs */}
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2 mb-2 uppercase tracking-wider text-xs">
              <FileText className="w-4 h-4 text-white" /> {t('header.docs')}
            </h3>
            <ul className="space-y-2 pl-6 text-white/90">
              <li>
                <a href="https://space-hunters-game.github.io/Guides/docs/eng/en.html" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 flex items-center gap-2">
                  <FileText size={14} /> Alpha Docs
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/40 pl-6">
                <FileText size={14} /> Games Guide (Soon)
              </li>
              <li className="flex items-center gap-2 text-white/40 pl-6">
                <FileText size={14} /> Pitch Deck (Soon)
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2 mb-2 uppercase tracking-wider text-xs">
              <Globe className="w-4 h-4 text-white" /> {t('header.community')}
            </h3>
            <ul className="space-y-2 pl-6 text-white/90">
              <li><a href="https://t.me/spacehunterss" className="hover:text-teal-400 flex items-center gap-2"><MessageCircle size={14} /> EN Chat</a></li>
              <li><a href="https://t.me/shspanish" className="hover:text-teal-400 flex items-center gap-2"><MessageCircle size={14} /> ES Chat</a></li>
              <li><a href="https://t.me/spacehuntersrus" className="hover:text-teal-400 flex items-center gap-2"><MessageCircle size={14} /> RU Chat</a></li>
              <li><a href="https://t.me/spacehuntersnews" className="hover:text-teal-400 flex items-center gap-2"><Newspaper size={14} /> General News</a></li>
              <li><a href="https://t.me/techgenerators" className="hover:text-teal-400 flex items-center gap-2"><Wrench size={14} /> Generators Channel</a></li>
              <li><a href="https://t.me/thechatadventure" className="hover:text-teal-400 flex items-center gap-2"><MessageCircle size={14} /> CHAD Channel</a></li>
              <li><a href="https://x.com/nftspacehunterss" className="hover:text-teal-400 flex items-center gap-2"><Send size={14} /> Space Hunters X</a></li>
              <li><a href="https://x.com/generatorsgame" className="hover:text-teal-400 flex items-center gap-2"><Send size={14} /> Tech Generators X</a></li>
              <li><a href="https://x.com/chatadventure" className="hover:text-teal-400 flex items-center gap-2"><Send size={14} /> Chat Adventure X</a></li>
              <li><a href="https://www.youtube.com/@SpaceHuntersGame" className="hover:text-teal-400 flex items-center gap-2"><Play size={14} /> YouTube</a></li>
              <li><a href="https://www.linkedin.com/company/space-hunters-game" className="hover:text-teal-400 flex items-center gap-2"><Users size={14} /> LinkedIn</a></li>
            </ul>
          </div>

          {/* Language Selector */}
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

export default HeaderTablet
