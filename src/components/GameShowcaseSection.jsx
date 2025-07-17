import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

const games = [
  {
    id: 'tech-generators',
    title: 'Tech Generators',
    status: 'Alpha',
    releaseDate: 'Dec 23, 2024',
    genre: 'Sci‑Fi - Mining - RPG',
    description:
      'Tech Generators is a sci‑fi mining game developed by the Space Hunters team. It offers real‑time gameplay, unique mechanics, and play‑to‑earn rewards.',
    tags: ['TMA', 'Browser', 'TON Chain'],
    banner: '/images/tech-banner.jpg',
    image: '/images/tech-card.jpg'
  },
  {
    id: 'chat-adventure',
    title: 'Chat Adventure',
    status: 'Pre‑Alpha',
    releaseDate: 'Mar 10, 2025',
    genre: 'Text RPG - AI - Interactive',
    description:
      'Chat Adventure is a narrative‑driven game where players build characters, explore factions, and unlock achievements through AI‑powered interaction.',
    tags: ['Telegram', 'AI', 'Roleplay'],
    banner: '/images/chat-banner.jpg',
    image: '/images/chat-card.jpg'
  },
  {
    id: 'space-hunters',
    title: 'The Reborn',
    status: 'Coming Soon',
    releaseDate: 'Q3 2025',
    genre: 'Shooter - MMO - Space',
    description:
      'An intense multiplayer experience combining space combat, exploration and faction wars in the revived Space Hunters universe.',
    tags: ['Shooter', 'MMO', 'Unity'],
    banner: '/images/hunters-banner.jpg',
    image: '/images/hunters-card.jpg'
  }
]

export default function GameShowcaseSection() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedGame = games[selectedIndex]

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

      {/* 🖼️ MAIN BANNER WITH PREVIEWS */}
      <motion.div
        key={selectedGame.id}
        className="absolute inset-x-0 top-0 mx-auto w-full max-w-7xl h-[60vh] bg-no-repeat bg-cover z-0 shadow-lg rounded-b-3xl border-b border-white/10"
        style={{
          backgroundImage: `url(${selectedGame.banner})`,
          backgroundSize: 'cover'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* 📦 CONTENT BELOW BANNER */}
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
            <h2 className="text-3xl font-extrabold text-white mb-2">{selectedGame.title}</h2>
            <p className="text-gray-200 mb-4">{selectedGame.description}</p>
            <p className="text-sm text-white/60 mb-1">🗓 {selectedGame.releaseDate}</p>
            <p className="text-sm text-white/60 mb-4">🎮 {selectedGame.genre}</p>
            <div className="flex flex-wrap gap-2">
              {selectedGame.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white/10 hover:bg-white/20 transition px-3 py-1 rounded-full text-sm text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 🧩 MINIATURES SELECTOR */}
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
                <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
