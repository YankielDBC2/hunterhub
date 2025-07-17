import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % images.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const getTransformStyle = (index) => {
    const offset = index - centerIndex
    const absOffset = Math.abs(offset)

    if (absOffset > 3) return 'hidden'

    let scale = 1 - absOffset * 0.15
    let opacity = 1 - absOffset * 0.3
    let translateX = offset * 120
    let blur = absOffset > 0 ? 'blur-sm' : ''

    return `absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-[${translateX}px] scale-[${scale}] opacity-[${opacity}] ${blur} transition-all duration-700`
  }

  return (
    <section className="relative text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-orbitron font-bold text-center mb-16 text-white">
          <span className="text-white">Hunter </span>
          <span className="text-red-500">Hub</span> App
        </h2>

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
