import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const thumbnail = "/images/video-thumbnail.png";

export default function WhatWeAreBuildingMobile() {
  const [videoStarted, setVideoStarted] = useState(false);
  const { t } = useTranslation();

  return (
    <section className="relative w-full text-white pt-12 pb-20 px-6 sm:px-8 overflow-hidden lg:hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* 🎥 VIDEO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-cyan-400/20 relative group"
        >
          {!videoStarted ? (
            <div onClick={() => setVideoStarted(true)} className="w-full h-full cursor-pointer">
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <motion.div
                  className="w-14 h-14 border-2 border-cyan-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <svg className="w-6 h-6 text-cyan-300" fill="currentColor" viewBox="0 0 20 20">
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

        {/* TEXT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl font-bold text-cyan-400 font-orbitron mb-6 text-center"
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          >
            {t('what_we_are_building.title')}
          </motion.h2>

          <motion.p
            className="text-white text-sm leading-relaxed tracking-wide text-justify font-sans mb-4"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            {t('what_we_are_building.paragraph_1')}
          </motion.p>

          <motion.p
            className="text-white text-sm leading-relaxed tracking-wide text-justify font-sans"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            {t('what_we_are_building.paragraph_2')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
