import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: '3 Click',
    highlight: 'SignUp',
    image: '/images/economy1.png',
  },
  {
    title: 'Play our',
    highlight: 'Games',
    image: '/images/economy2.png',
  },
  {
    title: 'Earn',
    highlight: 'Crypto',
    image: '/images/economy3.png',
  },
  {
    title: 'Invite',
    highlight: 'Friends',
    image: '/images/economy4.png',
  },
];

const SelfEconomy = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-12 px-6 sm:px-8 text-white">
      {/* Título */}
      <h2 className="text-center text-4xl md:text-5xl font-orbitron mb-4 pt-10">

        <span className="text-red-500">Web3</span> Self-Economy
      </h2>
      <p className="text-center text-lg max-w-2xl mx-auto mb-16 font-sans opacity-80">
        Simple, earn $HCASH tokens playing games
      </p>

      {/* PASOS */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-20">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative px-6">
            <motion.img
              src={step.image}
              alt={`Step ${index + 1}`}
              className="w-[110px] h-[110px] object-contain mb-6"
              animate={
                index === activeIndex
                  ? {
                      scale: [1, 1.15, 1],
                      opacity: [1, 1.25, 1],
                      filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
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
        Combining Faucet and Peer-to-Peer mechanics, we've built a dynamic,
        player-driven economy. Over 80% of in-game items are consumables,
        vanishing after use, which helps decrease the circulating supply. The
        rest are non-consumables with a very limited quantity, ensuring they
        remain valuable and exclusive.
      </p>
    </section>
  );
};

export default SelfEconomy;
