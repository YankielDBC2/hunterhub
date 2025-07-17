import { motion } from 'framer-motion'
import { useState } from 'react'

const thumbnail = "/images/video-thumbnail.png"

export default function WhatWeAreBuilding() {
  const [videoStarted, setVideoStarted] = useState(false)

  return (
    <section className="relative w-full text-white pt-16 pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center max-w-7xl mx-auto px-4">
        {/* VIDEO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-2xl border border-cyan-400/20 relative group"
        >
          {!videoStarted ? (
            <div
              onClick={() => setVideoStarted(true)}
              className="w-full h-full cursor-pointer"
            >
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 border-2 border-cyan-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <svg
                    className="w-8 h-8 text-cyan-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 4l12 6-12 6V4z" />
                  </svg>
                </motion.div>
              </div>
            </div>
          ) : (
            <iframe
              src="https://www.youtube.com/embed/TdNXrdk6ZYk?autoplay=1"
              title="Space Hunters Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </motion.div>

        {/* TEXTO */}
        <motion.div
          className="w-full md:w-1/2"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-cyan-400 font-orbitron"
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          >
            What We Are Building<span className="text-cyan-300">?</span>
          </motion.h2>

          <motion.p
            className="text-white text-sm md:text-base leading-relaxed tracking-wide font-sans mb-4"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            We are engineering the <span className="text-cyan-300 font-semibold">Space Hunters Ecosystem</span> — a fully immersive, interoperable gaming metaverse powered by blockchain and player ambition.
          </motion.p>

          <motion.p
            className="text-white text-sm md:text-base leading-relaxed tracking-wide font-sans mb-4"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            It includes <span className="text-cyan-300 font-semibold">Tech Generators</span>, a resource-management game where players optimize energy, hire engineers, and upgrade mining operations to earn real rewards.
          </motion.p>

          <motion.p
            className="text-white text-sm md:text-base leading-relaxed tracking-wide font-sans mb-4"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            Our economy runs on <span className="text-yellow-300 font-semibold">$HCASH</span> and <span className="text-yellow-300 font-semibold">$HCREDIT</span>, allowing for staking, enhancements, in-game purchases, and trading.
          </motion.p>

          <motion.p
            className="text-white text-sm md:text-base leading-relaxed tracking-wide font-sans"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            The <span className="text-cyan-300 font-semibold">Web Hub App</span> connects everything — track progress, participate in live events, manage NFTs, engage with the community, and unlock future features like collectibles, staking tools, and social systems.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
