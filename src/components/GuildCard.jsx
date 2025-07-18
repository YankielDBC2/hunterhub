import { FaUsers, FaComments } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { HiOutlineCalendar } from "react-icons/hi";
import dayjs from "dayjs";

export default function GuildCard({ guild }) {
  return (
    <div className="flex flex-col md:flex-row bg-[#1B1625] border border-red-500 rounded-2xl p-5 gap-5 shadow-xl">
      {/* Logo */}
      <div className="w-full md:w-[120px] flex-shrink-0 flex justify-center items-start">
        <img
          src={guild.logo}
          alt={`${guild.name} logo`}
          className="w-[110px] h-[110px] object-contain rounded-xl"
        />
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col justify-between text-white">
        {/* Título y descripción */}
        <div>
          <h3 className="text-lg md:text-xl font-bold border-b border-gray-400 pb-1">
            {guild.name}
          </h3>
          <p className="text-gray-300 text-sm mt-2 leading-relaxed text-justify">
            {guild.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {guild.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-red-700 text-white text-xs px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats inferiores */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <img src="/images/icons/d-icon.png" className="w-5 h-5" alt="D-icon" />
            <span className="text-yellow-400 font-semibold">{guild.level}</span>/100
          </div>
          <div>
            Guild Rank: <b>{guild.rank}</b>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineCalendar className="text-lg" />
            {dayjs(guild.joinDate).format("MMMM D, YYYY")}
          </div>
          <button className="bg-red-600 hover:bg-red-700 px-5 py-1 rounded-full text-white font-semibold">
            Join
          </button>
        </div>
      </div>

      {/* Columna de estadísticas */}
      <div className="flex flex-col gap-3 items-end text-right text-sm text-white">
        <div className="flex items-center gap-2">
          <FaUsers className="text-xl" /> {guild.members.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <FaComments className="text-xl" /> {guild.messages.toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <GiMoneyStack className="text-xl" /> ${guild.funds.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
