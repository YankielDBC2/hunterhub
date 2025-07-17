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
      className="relative text-white h-[90vh] overflow-hidden font-sans"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
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
            events: {
              onHover: { enable: true, mode: 'grab' }
            },
            modes: { grab: { distance: 150, links: { opacity: 0.2 } } }
          },
          detectRetina: true
        }}
      />

      <motion.div
        key={selectedGame.id}
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${selectedGame.banner})`, backgroundSize: '110%' }}
        initial={{ backgroundPositionX: '0%' }}
        animate={{ backgroundPositionX: '100%' }}
        transition={{ duration: 12, ease: 'linear' }}
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className="relative max-w-lg text-left p-6 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_60px_10px_rgba(255,255,255,0.03)] backdrop-blur-sm bg-white/10 group"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-xl pointer-events-none z-0 group-hover:animate-glow border border-transparent bg-gradient-to-br from-[#ffffff10] to-[#ff3c3c15] group-hover:blur-[3px]"
            />

            <div className="relative z-10 text-white">
              <motion.h1
                className="text-4xl font-extrabold mb-4 font-orbitron"
                variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}
              >
                {selectedGame.title}
              </motion.h1>
              <motion.p
                className="mb-4 text-gray-200 text-base font-sans"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                {selectedGame.description}
              </motion.p>
              <motion.p
                className="mb-1 text-yellow-400 font-bold font-sans"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                🟡 {selectedGame.status}
              </motion.p>
              <motion.p className="mb-1 font-sans" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                🗕️ {selectedGame.releaseDate}
              </motion.p>
              <motion.p className="mb-2 font-sans" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                🎮 Genre: <span className="text-gray-300">{selectedGame.genre}</span>
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2 my-4 font-sans"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                {selectedGame.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-md border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
              <motion.div className="flex gap-4 mt-4" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold shadow-md font-sans">
                  Open App
                </button>
                <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-5 py-2 rounded-lg font-semibold font-sans">
                  Whitepaper
                </button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex gap-4 items-end justify-start md:justify-end"
          >
            {games.map((game, index) => (
              <div key={game.id} className="text-center group">
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  src={game.image}
                  alt={game.title}
                  onClick={() => setSelectedIndex(index)}
                  className={`cursor-pointer rounded-xl transition-all duration-300 border-2 shadow-xl backdrop-blur-md group-hover:brightness-110 group-hover:saturate-150 group-hover:shadow-red-500/20 group-hover:animate-glowScan
                    ${selectedGame.id === game.id
                    ? 'border-red-500 scale-110'
                    : 'border-transparent grayscale hover:scale-105'}`}
                  style={{ height: selectedGame.id === game.id ? '240px' : '180px' }}
                />
                <p className="text-sm mt-2 text-white/80 font-sans">{game.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </motion.section>
  )
}