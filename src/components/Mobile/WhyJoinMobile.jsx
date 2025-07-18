import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const floatAnim = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 0px rgba(255,255,255,0)',
      '0 0 12px rgba(255,255,255,0.1)',
      '0 0 0px rgba(255,255,255,0)',
    ],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: 'easeInOut',
    },
  },
}

export default function WhyJoinMobile() {
  const { t } = useTranslation()
  const subtitles = t('why_join.subtitle_rotation', { returnObjects: true }) || []
  const template = t('why_join.animated_title')

  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    if (!subtitles.length) return
    const fullText = subtitles[index]

    if (typing && charIndex <= fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex))
        setCharIndex((prev) => prev + 1)
      }, 70)
      return () => clearTimeout(timeout)
    }

    if (charIndex > fullText.length) {
      const pause = setTimeout(() => {
        setTyping(false)
        setTimeout(() => {
          setCharIndex(0)
          setIndex((prev) => (prev + 1) % subtitles.length)
          setTyping(true)
        }, 300)
      }, 1000)
      return () => clearTimeout(pause)
    }
  }, [charIndex, typing, index, subtitles])

  const parts = template.split('{{value}}')
  const benefits = t('why_join.benefits', { returnObjects: true })

  return (
    <section className="relative text-white pb-20 px-5 pt-10 overflow-hidden">

      {/* 🌌 Imagen Principal (box3) */}
      <motion.img
        src="/images/box3.png"
        alt="Energy Core"
        className="w-[180px] mx-auto mb-8 drop-shadow-md"
        {...floatAnim}
      />

      {/* 🧠 Título animado */}
      <motion.h2
        className="text-xl md:text-3xl font-orbitron text-center mb-4 leading-tight"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {parts[0]}
        <br /> {/* ⬅️ Fuerza salto de línea */}
        <span className="text-red-500 inline-block">
          {displayText}
          <span className="inline-block animate-pulse">|</span>
        </span>
        {parts[1]}
      </motion.h2>


      <motion.p
        className="text-gray-400 text-sm text-center font-sans mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        {t('why_join.description')}
      </motion.p>

      {/* 📦 Cajas de beneficios */}
      <div className="grid grid-cols-1 gap-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            className="bg-[#1b1923] border border-white/10 p-4 rounded-md text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            viewport={{ once: true }}
            {...glowPulse}
          >
            <h3 className="font-orbitron font-bold text-white mb-1">
              {benefit.title}{' '}
              <span className="text-red-500">{benefit.highlight}</span>
            </h3>
            <p className="text-gray-400 font-sans text-xs">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      {/* 🎁 Imágenes inferiores */}
      <motion.div
        className="mt-8 flex justify-center gap-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.img
          src="/images/box1.png"
          alt="Loot Box"
          className="w-[100px] drop-shadow"
          {...floatAnim}
        />
        <motion.img
          src="/images/box2.png"
          alt="Mystery Box"
          className="w-[100px] drop-shadow"
          {...floatAnim}
          transition={{ delay: 0.2 }}
        />
      </motion.div>
    </section>
  )
}
