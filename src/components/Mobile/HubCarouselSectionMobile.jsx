import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const images = [
  '/images/hub1.png',
  '/images/hub2.png',
  '/images/hub3.png',
  '/images/hub4.png',
  '/images/hub5.png',
  '/images/hub6.png',
  '/images/hub7.png',
  '/images/hub8.png',
  '/images/hub9.png',
  '/images/hub10.png'
]

export default function HubCarouselSectionMobile() {
  const [index, setIndex] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="lg:hidden py-10 px-6 text-white text-center">
      <h2 className="text-2xl font-orbitron font-bold leading-snug mb-3">
        <span>{t('hub_carousel.title_part1')} </span>
        <span className="text-red-500">{t('hub_carousel.title_part2')}</span> {t('hub_carousel.title_accent')}
      </h2>

      <div className="text-[15px] text-gray-300 text-justify leading-relaxed max-w-[92%] mx-auto mb-6">
        <p>{t('hub_carousel.description')}</p>
      </div>

      <div className="relative w-full h-[360px] flex items-center justify-center overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`hub-mobile-${index}`}
            className="absolute max-h-[340px] w-auto mx-auto object-contain rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? 'bg-red-500 scale-110' : 'bg-gray-500/50'}`}
          />
        ))}
      </div>
    </section>
  )
}
