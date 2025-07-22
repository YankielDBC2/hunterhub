import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useTranslation } from 'react-i18next'

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

export default function GameShowcaseSection() {
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

  const particlesInit = async (engine) => {
    await loadFull(engine)
  }

  return (
    <motion.section
      className="relative text-white min-h-screen overflow-hidden font-sans"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* 🌌 BACKGROUND PARTICLES */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Particles
          className="absolute inset-0 -z-10"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 60 },
              color: { value: '#ffffff10' },
              shape: { type: 'circle' },
              opacity: { value: 0.12, random: true },
              size: { value: { min: 1, max: 3 } },
              move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                outModes: 'bounce'
              },
              links: {
                enable: true,
                distance: 120,
                color: '#ffffff05',
                opacity: 0.08,
                width: 1
              }
            },
            interactivity: {
              events: { onHover: { enable: true, mode: 'grab' } },
              modes: { grab: { distance: 150, links: { opacity: 0.2 } } }
            },
            detectRetina: true
          }}
        />
      </div>

      {/* 🖼️ MAIN BANNER */}
      <motion.div
        key={selectedGame.id}
        className="absolute inset-x-0 top-0 mx-auto w-full max-w-7xl h-[60vh] z-0 shadow-lg rounded-b-3xl border-b border-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {selectedGame.banner.endsWith('.mp4') ? (
          <video
            className="w-full h-full object-cover"
            src={selectedGame.banner}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${selectedGame.banner})` }}
          />
        )}
      </motion.div>

      {/* 📦 CONTENT */}
      <div className="relative z-10 pt-[55vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col md:flex-row justify-between items-end gap-10">
          {/* 🧠 INFO BOX */}
          <motion.div
            key={selectedGame.id + '-info'}
            className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-[0_0_40px_#00f2ff22] w-full max-w-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-white/5 blur-md -z-10" />
            <h2 className="text-3xl font-extrabold text-white mb-2">{gameData.title}</h2>
            <p className="text-gray-200 mb-4">{gameData.description}</p>
            <p className="text-sm text-white/60 mb-1">🗓 {gameData.release}</p>
            <p className="text-sm text-white/60 mb-4">🎮 {gameData.genre}</p>
            <div className="flex flex-wrap gap-2">
              {gameData.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded-full text-sm text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 🔘 BUTTONS */}
            <div className="flex gap-3 mt-6">
              {gameData.appUrl ? (
                <a href={gameData.appUrl} target="_blank" rel="noopener noreferrer">
                  <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    Open App
                  </button>
                </a>
              ) : (
                <button
                  className="bg-gray-700 px-4 py-2 rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed"
                  disabled
                >
                  Game App
                </button>
              )}

              {gameData.whitepaperUrl ? (
                <a href={gameData.whitepaperUrl} target="_blank" rel="noopener noreferrer">
                  <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    Whitepaper
                  </button>
                </a>
              ) : (
                <button
                  className="border border-gray-500 text-gray-400 px-4 py-2 rounded-lg text-sm font-semibold opacity-50 cursor-not-allowed"
                  disabled
                >
                  Whitepaper
                </button>
              )}
            </div>
          </motion.div>

          {/* 🧩 MINIATURE SELECTOR */}
          <div className="hidden md:flex gap-6 items-center">
            {games.map((game, i) => (
              <motion.div
                key={game.id}
                className={`w-24 h-36 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  i === selectedIndex
                    ? 'border-cyan-400 scale-110 shadow-lg'
                    : 'border-white/10 opacity-50 hover:opacity-80'
                }`}
                onClick={() => setSelectedIndex(i)}
                whileHover={{ scale: i === selectedIndex ? 1.1 : 1.05 }}
              >
                <img src={game.image} alt={game.id} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
