import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
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

export default function HubCarouselSection() {
  const [centerIndex, setCenterIndex] = useState(0)
  const containerRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % images.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-orbitron font-bold text-center text-white">
          <span className="text-white">{t('hub_carousel.title_part1')} </span>
          <span className="text-red-500">{t('hub_carousel.title_part2')}</span> {t('hub_carousel.title_accent')}
        </h2>

        <p className="text-center text-lg text-gray-300 mt-4 mb-16 max-w-2xl mx-auto">
          {t('hub_carousel.description')}
        </p>

        <div ref={containerRef} className="relative h-[650px] w-full flex items-center justify-center">
          {images.map((src, index) => {
            const offset = (index - centerIndex + images.length) % images.length
            const relativeIndex = offset > images.length / 2 ? offset - images.length : offset
            const absOffset = Math.abs(relativeIndex)

            if (absOffset > 3) return null

            const scale = 1 - absOffset * 0.2
            const opacity = 1 - absOffset * 0.3
            const translateX = relativeIndex * 220
            const blur = absOffset > 0 ? 'blur-sm' : ''

            return (
              <motion.div
                key={index}
                className={`absolute transition-all duration-700 ease-in-out ${blur} ${
                  relativeIndex === 0 ? 'z-30' : 'z-10'
                }`}
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity
                }}
              >
                <img
                  src={src}
                  alt={`hub-${index}`}
                  className="rounded-2xl shadow-2xl max-h-[600px] w-auto object-contain"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
