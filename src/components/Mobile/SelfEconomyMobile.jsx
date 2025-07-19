import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const images = [
  '/images/economy1.png',
  '/images/economy2.png',
  '/images/economy3.png',
  '/images/economy4.png'
]

export default function SelfEconomyMobile() {
  const containerRef = useRef(null)
  const { t } = useTranslation()
  const steps = t('self_economy.steps', { returnObjects: true })

  useEffect(() => {
    const container = containerRef.current
    let scrollX = 0
    let animationFrameId

    const animateScroll = () => {
      if (!container) return
      scrollX += 0.9 // 🎯 velocidad corregida (más suave)
      if (scrollX >= container.scrollWidth / 2) {
        scrollX = 0
      }
      container.scrollLeft = scrollX
      animationFrameId = requestAnimationFrame(animateScroll)
    }

    animationFrameId = requestAnimationFrame(animateScroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <section className="lg:hidden py-10 px-4 text-white text-center overflow-hidden relative">
      {/* Título */}
      <h2 className="text-2xl font-orbitron font-bold mb-2 leading-snug">
        <span className="text-red-500">Web3</span>{' '}
        {t('self_economy.title').replace('Web3 ', '')}
      </h2>

      {/* Descripción justificada */}
      <div className="text-[15px] text-gray-300 text-justify leading-relaxed max-w-[92%] mx-auto mb-6">
        <p>{t('self_economy.subtitle')}</p>
      </div>

      {/* Carrusel continuo */}
      <div
        ref={containerRef}
        className="overflow-hidden no-scrollbar w-full"
      >
        <div className="flex gap-10 w-max px-4">
          {[...steps, ...steps].map((step, i) => (
            <div key={i} className="relative flex items-center gap-3 min-w-[190px]">
              {/* Imagen + texto en caja */}
              <div className="flex flex-col items-center">
                <img
                  src={images[i % 4]}
                  alt={`step-${i}`}
                  className="w-[80px] h-[80px] object-contain mb-2"
                />
                <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 w-[140px] text-xs font-orbitron leading-tight text-white">
                  <span className="text-red-500">{step.title} </span>
                  {step.highlight}
                </div>
              </div>

              {/* Flecha (solo si no es el último del set) */}
              {(i % 4 !== 3) && (
                <img
                  src="/images/economy-arrow.png"
                  alt="arrow"
                  className="w-12 h-auto mt-2"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Texto final justificado */}
      <div className="text-[15px] text-gray-400 text-justify leading-relaxed max-w-[92%] mx-auto mt-6">
        <p>{t('self_economy.final_description')}</p>
      </div>
    </section>
  )
}
