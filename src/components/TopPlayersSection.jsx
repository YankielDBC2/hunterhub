import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const players = [
  {
    name: "Player",
    joined: "07/12/2024",
    nft: 52,
    hcash: 56233,
    profileImg: "/images/p1.png",
    medal: "/images/Leader1.png",
    medalTooltip: "top_players.medal_leader1",
  },
  {
    name: "Player",
    joined: "07/12/2024",
    nft: 65,
    hcash: 56233,
    profileImg: "/images/p2.png",
    medal: "/images/Leader2.png",
    medalTooltip: "top_players.medal_leader2",
  },
  {
    name: "Player",
    joined: "07/12/2024",
    nft: 65,
    hcash: 56233,
    profileImg: "/images/p3.png",
    medal: "/images/Leader3.png",
    medalTooltip: "top_players.medal_leader3",
  },
  {
    name: "Player",
    joined: "07/12/2024",
    nft: 65,
    hcash: 56233,
    profileImg: "/images/p4.png",
    medal: "/images/Elite3.png",
    medalTooltip: "top_players.medal_elite3",
  },
  {
    name: "Player",
    joined: "07/12/2024",
    nft: 65,
    hcash: 56233,
    profileImg: "/images/p5.png",
    medal: "/images/Veteran1.png",
    medalTooltip: "top_players.medal_veteran1",
  },
];

export default function TopPlayersSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-3xl font-orbitron font-bold mb-10 text-left"
          dangerouslySetInnerHTML={{ __html: t("top_players.title") }}
        />


        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={5}
          breakpoints={{
            640: { slidesPerView: 5 },
            768: { slidesPerView: 5 },
            1280: { slidesPerView: 5 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          className="pb-10"
        >
          {players.map((player, i) => (
            <SwiperSlide key={i}>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.0}
                scale={1.00}
                transitionSpeed={500}
                tiltMaxAngleX={0}
                tiltMaxAngleY={0}
                className="group"
              >
                <motion.div
                  className="relative bg-[#1c1b29] border border-red-500 rounded-xl p-3 shadow-md hover:shadow-red-500/40 transition-all w-[200px] mx-auto"
                  
                >
                  {/* Glow border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur-lg opacity-25 group-hover:opacity-40 transition-all z-0" />
                  <div className="relative z-20">
                    <img
                      src={player.profileImg}
                      alt="Player"
                      className="w-full h-54 object-cover rounded-md mb-3"
                    />
                    <h3 className="text-center font-bold text-[20px]">
                      {player.name}
                    </h3>
                    <p className="text-center text-gray-400 text-sm mb-3">
                      {t("top_players.joined")}:{" "}
                      <span className="text-white">{player.joined}</span>
                    </p>
                    <div
                      className="flex justify-center gap-2 items-center text-sm text-yellow-400 mb-5"
                      title={t(player.medalTooltip)}
                    >
                      <img
                        src={player.medal}
                        alt="medal"
                        className="w-9 h-9 hover:scale-100 transition"
                      />
                      <span>{t("top_players.rank")}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2 px-1">
                      <div className="flex gap-1 items-center">
                        <img
                          src="/images/nft.png"
                          className="w-8 h-8"
                          alt="NFT"
                        />
                        {player.nft}
                      </div>
                      <div className="flex gap-1 items-center">
                        <img
                          src="/images/HCASH001.png"
                          className="w-6 h-6"
                          alt="HCASH"
                        />
                        {player.hcash.toLocaleString()}$
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
