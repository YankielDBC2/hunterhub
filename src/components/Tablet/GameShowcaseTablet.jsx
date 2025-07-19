import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const games = [
  {
    id: 'tech-generators',
    banner: '/images/tech-banner.jpg',
    image: '/images/tech-card.jpg'
  },
  {
    id: 'chat-adventure',
    banner: '/images/chat-banner.jpg',
    image: '/images/chat-card.jpg'
  },
  {
    id: 'space-hunters',
    banner: '/images/hunters-banner.jpg',
    image: '/images/hunters-card.jpg'
  }
]

export default function GameShowcaseTablet() {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedGame = games[selectedIndex]
  const gameData = t(`games.${selectedGame.id}`, { returnObjects: true })

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % games.length)
    }, 12000)
    return () => clearInterval(timer)
  }, [])

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + games.length) % games.length)
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % games.length)
  }

  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  return (
    <motion.section
      className="hidden md:block lg:hidden relative text-white min-h-[620px] font-sans overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* 🌌 Particles */}
      <Particles
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 50 },
            color: { value: '#ffffff10' },
            shape: { type: 'circle' },
            opacity: { value: 0.15, random: true },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 0.6 },
            links: {
              enable: true,
              distance: 110,
              color: '#ffffff05',
              opacity: 0.1,
              width: 1
            }
          },
          interactivity: {
            events: { onHover: { enable: true, mode: 'grab' } },
            modes: { grab: { distance: 140, links: { opacity: 0.2 } } }
          },
          detectRetina: true
        }}
      />

      {/* 🎮 Banner de juego */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGame.id}
            className="absolute w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedGame.banner})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 flex items-center justify-between px-6">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handlePrev}
            className="bg-black/50 p-3 rounded-full backdrop-blur-md"
          >
            <ChevronLeft className="text-white w-7 h-7" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleNext}
            className="bg-black/50 p-3 rounded-full backdrop-blur-md"
          >
            <ChevronRight className="text-white w-7 h-7" />
          </motion.button>
        </div>
      </div>

      {/* ℹ️ Info Box */}
      <motion.div
        key={selectedGame.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 -mt-14 mx-10 p-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-[0_0_40px_#00f2ff33]"
      >
        <h2 className="text-2xl font-bold mb-2">{gameData.title}</h2>
        <p className="text-base text-gray-300 mb-3">{gameData.description}</p>
        <p className="text-sm text-white/60 mb-1">🗓 {gameData.release}</p>
        <p className="text-sm text-white/60 mb-3">🎮 {gameData.genre}</p>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {gameData.tags?.map((tag, i) => (
            <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-sm text-white/80">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-3">
          <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-sm font-semibold">
            Open App
          </button>
          <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg text-sm font-semibold">
            Whitepaper
          </button>
        </div>
      </motion.div>
    </motion.section>
  )
}
