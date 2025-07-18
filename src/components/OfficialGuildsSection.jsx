import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaComments, FaCalendarAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { PiMedalFill } from "react-icons/pi";
import guilds from "./data/guildsData";

const OfficialGuildsSection = () => {
  return (
    <section className="w-full px-6 md:px-16 py-12 text-white">
      <h2 className="text-3xl font-bold mb-10">
        <span className="text-white">Meet Our Official</span>{" "}
        <span className="text-red-500">Guilds</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {guilds.map((guild, index) => (
          <motion.div
            key={index}
            className="bg-[#1f1430] border border-red-500 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6 hover:scale-[1.015] hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.015 }}
          >
            <img
              src={guild.image}
              alt={guild.name}
              className="w-[120px] h-[120px] rounded-lg object-cover"
            />

            <div className="flex-1 w-full">
              <h3 className="text-xl font-semibold">{guild.name}</h3>
              <hr className="my-2 border-t border-white/30" />
              <p className="text-sm text-gray-300 mb-4">{guild.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {guild.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-red-700 text-white text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-sm gap-6 mb-3">
                <div className="flex items-center gap-2 text-yellow-400">
                  <PiMedalFill className="text-lg" />
                  <span className="font-bold">{guild.score}</span>/100
                </div>
                <div className="text-gray-400">
                  <strong className="text-white">Guild Rank:</strong> {guild.rank}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaCalendarAlt />
                  {guild.date}
                </div>
              </div>

              <div className="flex items-center gap-5 justify-between flex-wrap">
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <FaUsers /> {guild.members}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComments /> {guild.messages}
                  </div>
                  <div className="flex items-center gap-1">
                    <GiMoneyStack className="text-green-400" />
                    ${guild.earnings.toLocaleString()}
                  </div>
                </div>
                <button className="bg-red-600 hover:bg-red-700 transition-all text-white px-6 py-2 rounded-xl font-bold">
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OfficialGuildsSection;
