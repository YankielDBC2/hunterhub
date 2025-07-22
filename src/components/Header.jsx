import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 200)
  }

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
        <div className="absolute mt-2 w-52 bg-black/80 border border-white/10 backdrop-blur-lg rounded-md shadow-lg z-50">
          <ul className="py-2 text-sm">
            {items.map((item, i) => (
              <li key={i}>
                {item.disabled ? (
                  <span className="block px-4 py-2 text-white/40 cursor-not-allowed">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.link}
                    className="block px-4 py-2 hover:bg-white/10 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const Header = () => {
  const { t, i18n } = useTranslation()
  const [selectedLang, setSelectedLang] = useState(() => {
    const saved = localStorage.getItem('preferredLang')
    return saved ? saved.toUpperCase() : i18n.language.toUpperCase()
  })
  const [langOpen, setLangOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const tooltipRef = useRef()
  const [forceRerender, setForceRerender] = useState(0)
  const timeoutRef = useRef(null)

  const [priceUsd, setPriceUsd] = useState('0.0000')
  const [priceTon, setPriceTon] = useState('0.000000')

  const allLangs = ['EN', 'ES', 'RU', 'ZH', 'DE', 'FR', 'IT', 'JA', 'KO', 'PT']
  const otherLangs = allLangs.filter((l) => l !== selectedLang)

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang')?.toLowerCase()
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang).then(() => {
        setForceRerender((prev) => prev + 1)
      })
    }

    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setTooltipOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [i18n])

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          'https://corsproxy.io/?https://api.hunterhub.online/api/public/hcash/price'
        )
        const json = await res.json()
        setPriceUsd(json.data?.usd?.toFixed(4) || '0.0000')
        setPriceTon(json.data?.ton?.toFixed(6) || '0.000000')
      } catch (err) {
        console.error('Failed to fetch HCASH price:', err)
      }
    }

    fetchPrice()
  }, [])

  const handleLangSelect = (lang) => {
    const lowerLang = lang.toLowerCase()
    localStorage.setItem('preferredLang', lowerLang)
    i18n.changeLanguage(lowerLang).then(() => {
      setSelectedLang(lang)
      setLangOpen(false)
      setForceRerender((prev) => prev + 1)
    })
  }

  const docsItems = [
    {
      label: 'Alpha Docs',
      link: 'https://space-hunters-game.github.io/Guides/docs/eng/en.html'
    },
    { label: 'Games Guide (Soon)', link: '', disabled: true },
    { label: 'Pitch Deck (Soon)', link: '', disabled: true }
  ]

  const communityItems = [
    { label: 'EN Chat', link: 'https://t.me/spacehunterss' },
    { label: 'ES Chat', link: 'https://t.me/shspanish' },
    { label: 'RU Chat', link: 'https://t.me/spacehuntersrus' },
    { label: 'General News', link: 'https://t.me/spacehuntersnews' },
    { label: 'Generators Channel', link: 'https://t.me/techgenerators' },
    { label: 'CHAD Channel', link: 'https://t.me/thechatadventure' },
    { label: 'Space Hunters X', link: 'https://x.com/nftspacehunterss' },
    { label: 'Tech Generators X', link: 'https://x.com/generatorsgame' },
    { label: 'Chat Adventure X', link: 'https://x.com/chatadventure' },
    { label: 'YouTube', link: 'https://www.youtube.com/@SpaceHuntersGame' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/company/space-hunters-game' }
  ]

  return (
    <header
      key={forceRerender}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-black/30 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between shadow-lg border border-white/10"
    >
      {/* Logo + HCASH + Tooltip */}
      <div className="flex items-center gap-6 relative">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-red-500">H</span>
          <span className="text-red">UB</span>
        </h1>

        <div
          className="relative flex items-center gap-1 cursor-pointer"
          onClick={() => setTooltipOpen(!tooltipOpen)}
        >
          <img src="/images/HCASH_01.png" alt="HCASH" className="w-5 h-5" />
          <span className="text-sm text-white font-medium">${priceUsd}</span>

          {tooltipOpen && (
            <div
              ref={tooltipRef}
              className="absolute left-0 top-8 bg-black text-white text-sm rounded-md shadow-xl p-3 z-50 w-64 border border-white/10"
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

      {/* Nav + Language Selector */}
      <nav className="flex items-center space-x-6 text-sm">
        <Dropdown title={t('header.docs')} items={docsItems} />
        <Dropdown title={t('header.community')} items={communityItems} />
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
          onMouseEnter={() => setLangOpen(true)}
          onMouseLeave={() => setLangOpen(false)}
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
  )
}

export default Header
