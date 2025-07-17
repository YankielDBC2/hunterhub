import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const benefits = [
  {
    title: 'Access',
    highlight: 'Exclusive Games',
    description:
      'Get early access to new releases and hidden gems, only for registered members. Be the first to play!',
  },
  {
    title: 'Explore',
    highlight: 'Memberships & Benefits',
    description:
      'Monitor gameplay stats, track achievements, and share your progress with fellow gamers easily.',
  },
  {
    title: 'Real',
    highlight: 'Community Engagement',
    description:
      'Connect with a passionate community of gamers. Share tips, strategies, and gaming experiences.',
  },
  {
    title: 'Long-Term &',
    highlight: 'Deflationary Tokenomic',
    description:
      'Enjoy member-only discounts on top-rated games, DLCs, and in-game items. Save on your favorites!',
  },
];

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
  const titles = ['Play-To-Earn', 'Free-To-Play', 'Engage-To-Earn'];
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let typingInterval;

    const typeText = () => {
      const fullText = titles[index];
      currentText = '';
      currentIndex = 0;

      typingInterval = setInterval(() => {
        currentText += fullText[currentIndex];
        setDisplayedText(currentText);
        currentIndex++;

        if (currentIndex === fullText.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setIndex((prev) => (prev + 1) % titles.length);
          }, 1600);
        }
      }, 70);
    };

    typeText();
    return () => clearInterval(typingInterval);
  }, [index]);

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
            The Ultimate Web3{' '}
            <span className="text-red-500 inline-block">{displayedText}</span>{' '}
            Experience
          </motion.h2>

          <motion.p
            className="text-gray-400 text-sm md:text-base text-center lg:text-left mb-10 max-w-xl font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Sign up now to dive into exclusive content, track your progress, and connect with a global community of gamers. Don’t miss out on special offers made just for you!
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
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-6">
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
