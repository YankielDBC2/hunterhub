import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const images = [
  '/images/economy1.png',
  '/images/economy2.png',
  '/images/economy3.png',
  '/images/economy4.png'
]

const SelfEconomy = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const steps = t('self_economy.steps', { returnObjects: true })

  return (
    <section className="relative py-12 px-6 sm:px-8 text-white">
      {/* Título */}
      <h2 className="text-center text-4xl md:text-5xl font-orbitron mb-4 pt-10">
        <span className="text-red-500">Web3</span> {t('self_economy.title').replace('Web3 ', '')}
      </h2>

      <p className="text-center text-lg max-w-2xl mx-auto mb-16 font-sans opacity-80">
        {t('self_economy.subtitle')}
      </p>

      {/* PASOS */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-20">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative px-6">
            <motion.img
              src={images[index]}
              alt={`Step ${index + 1}`}
              className="w-[110px] h-[110px] object-contain mb-6"
              animate={
                index === activeIndex
                  ? {
                      scale: [1, 1.15, 1],
                      opacity: [1, 1.25, 1],
                      filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
                    }
                  : { scale: 1, boxShadow: 'none' }
              }
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
            <p className="text-lg font-orbitron leading-tight">
              <span className="text-red-500">{step.title} </span>
              {step.highlight}
            </p>

            {/* Flecha discontinua */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute right-[-110px] top-[30%] w-32 h-12 mt-2">
                <img
                  src="/images/economy-arrow.png"
                  alt="arrow"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* TEXTO FINAL */}
      <p className="text-center text-base font-sans opacity-80 max-w-3xl mx-auto mt-20 leading-relaxed">
        {t('self_economy.final_description')}
      </p>
    </section>
  )
}

export default SelfEconomy
