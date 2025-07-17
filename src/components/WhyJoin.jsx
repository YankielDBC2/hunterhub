import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const floatAnim = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 0px rgba(255,255,255,0)',
      '0 0 16px rgba(255,255,255,0.15)',
      '0 0 0px rgba(255,255,255,0)',
    ],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: 'easeInOut',
    },
  },
};

export default function WhyJoin() {
  const { t } = useTranslation();
  const subtitles = t('why_join.subtitle_rotation', { returnObjects: true }) || [];
  const template = t('why_join.animated_title');

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (!subtitles.length) return;
    const fullText = subtitles[index];

    if (typing && charIndex <= fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }

    if (charIndex > fullText.length) {
      const pause = setTimeout(() => {
        setTyping(false);
        setTimeout(() => {
          setCharIndex(0);
          setIndex((prev) => (prev + 1) % subtitles.length);
          setTyping(true);
        }, 300);
      }, 1200);
      return () => clearTimeout(pause);
    }
  }, [charIndex, typing, index, subtitles]);

  const parts = template.split('{{value}}');
  const benefits = t('why_join.benefits', { returnObjects: true });

  return (
    <section className="relative text-white py-28 px-6 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h2
            className="text-xl md:text-3xl font-orbitron text-center lg:text-left mb-4 leading-tight whitespace-nowrap"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {parts[0]}
            <span className="text-red-500 inline-block">
              {displayText}
              <span className="inline-block animate-pulse">|</span>
            </span>
            {parts[1]}
          </motion.h2>

          <motion.p
            className="text-gray-400 text-sm md:text-base text-center lg:text-left mb-10 max-w-xl font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('why_join.description')}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-[#1b1923] border border-white/10 p-5 rounded-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                viewport={{ once: true }}
                {...glowPulse}
              >
                <h3 className="font-orbitron font-bold text-white text-base mb-2">
                  {benefit.title}{' '}
                  <span className="text-red-500">{benefit.highlight}</span>
                </h3>
                <p className="text-sm text-gray-400 font-sans">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-5">
            <motion.img
              src="/images/box1.png"
              alt="Loot Box"
              className="w-[140px] md:w-[160px] drop-shadow-lg"
              {...floatAnim}
              transition={{ delay: 0 }}
            />
            <motion.img
              src="/images/box2.png"
              alt="Mystery Box"
              className="w-[140px] md:w-[160px] drop-shadow-lg"
              {...floatAnim}
              transition={{ delay: 0.2 }}
            />
          </div>
          <motion.img
            src="/images/box3.png"
            alt="Energy Core"
            className="w-[256px] md:w-[280px] drop-shadow-lg"
            {...floatAnim}
            transition={{ delay: 0.4 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
