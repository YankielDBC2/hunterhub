import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const stats = {
  "24h": {
    hunterCredit: [
      { time: "08:00", burned: 1.5, circulating: 1.0, mediaValue: 0.5 },
      { time: "10:00", burned: 1.7, circulating: 0.8, mediaValue: 0.9 },
      { time: "12:00", burned: 0.3, circulating: 0.6, mediaValue: 1.2 },
      { time: "14:00", burned: 0.9, circulating: 1.1, mediaValue: 1.4 },
      { time: "16:00", burned: 1.6, circulating: 0.9, mediaValue: 1.1 },
    ],
    marketplace: [
      { time: "08:00", hcash: 1.5, listed: 1.0, sold: 0.5 },
      { time: "10:00", hcash: 1.7, listed: 0.8, sold: 0.9 },
      { time: "12:00", hcash: 0.3, listed: 0.6, sold: 1.2 },
      { time: "14:00", hcash: 0.9, listed: 1.1, sold: 1.4 },
      { time: "16:00", hcash: 1.6, listed: 0.9, sold: 1.1 },
    ],
    store: [
      { time: "08:00", hcash: 1.5, users: 1.0, transactions: 0.5 },
      { time: "10:00", hcash: 1.7, users: 0.8, transactions: 0.9 },
      { time: "12:00", hcash: 0.3, users: 0.6, transactions: 1.2 },
      { time: "14:00", hcash: 0.9, users: 1.1, transactions: 1.4 },
      { time: "16:00", hcash: 1.6, users: 0.9, transactions: 1.1 },
    ],
  },
  // Puedes añadir aquí datasets para "7d" y "30d" más adelante
};

export default function TrendingAssetsSectionMobile() {
  const [current, setCurrent] = useState(0);
  const [timeFilter, setTimeFilter] = useState("24h");
  const { t } = useTranslation();

  const charts = [
    {
      key: "hunter_credit",
      data: stats[timeFilter].hunterCredit,
      areas: [
        { key: "burned", color: "#FF0000" },
        { key: "circulating", color: "#177DDC" },
        { key: "media_value", color: "#02FD2A" },
      ],
    },
    {
      key: "marketplace",
      data: stats[timeFilter].marketplace,
      areas: [
        { key: "hcash", color: "#ffaa00", label: "hunter_credit" },
        { key: "listed", color: "#177DDC" },
        { key: "sold", color: "#02FD2A" },
      ],
    },
    {
      key: "store",
      data: stats[timeFilter].store,
      areas: [
        { key: "hcash", color: "#ffaa00", label: "hunter_credit" },
        { key: "users", color: "#3399ff" },
        { key: "transactions", color: "#33ff66" },
      ],
    },
  ];

  const next = () => setCurrent((prev) => (prev + 1) % charts.length);
  const prev = () => setCurrent((prev) => (prev - 1 + charts.length) % charts.length);

  const { key, data, areas } = charts[current];
  const title = t(`trending.charts.${key}`);
  const prevName = t(`trending.charts.${charts[(current - 1 + charts.length) % charts.length].key}`);
  const nextName = t(`trending.charts.${charts[(current + 1) % charts.length].key}`);

  return (
    <section className="lg:hidden px-4 py-10 text-white text-center relative z-10">
      {/* Título */}
      <h2 className="text-2xl font-orbitron font-bold leading-snug mb-1">
        <span className="text-red-500">{t("trending.title").split(" ")[0]}</span>{" "}
        {t("trending.title").split(" ").slice(1).join(" ")}
      </h2>

      {/* Descripción */}
      <p className="text-sm text-gray-300 mb-4 max-w-sm mx-auto">{t("trending.description")}</p>

      {/* Filtros */}
      <div className="flex justify-center gap-2 mb-4">
        {["24h", "7d", "30d"].map((time) => (
          <button
            key={time}
            className={`px-3 py-1 text-sm rounded border ${
              timeFilter === time ? "bg-white text-black" : "border-white text-white"
            } transition font-semibold`}
            onClick={() => setTimeFilter(time)}
          >
            {time.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Título de gráfica actual */}
      <h3 className="text-white text-sm font-orbitron mb-2">{title}</h3>

      {/* Bitácora (leyenda) */}
      <div className="flex justify-center items-center gap-4 mb-3 text-xs font-semibold">
        {areas.map(({ key: areaKey, color, label }) => (
          <div key={areaKey} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }} />
            <span>{t(`trending.charts.${label || areaKey}`)}</span>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <motion.div
        className="w-full flex justify-center mb-4"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md pr-8 -ml-2">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data}>
              <defs>
                {areas.map(({ key, color }) => (
                  <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="#aaa" fontSize={11} />
              <YAxis stroke="#aaa" fontSize={11} />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload && (
                    <div className="bg-gray-900 border border-white/10 rounded-lg p-3 shadow-lg text-sm text-white font-mono">
                      {payload.map((entry, i) => (
                        <div key={i} style={{ color: entry.stroke }}>
                          {entry.name}: {entry.value}
                        </div>
                      ))}
                      <div className="text-gray-400 mt-1 text-xs">{label}</div>
                    </div>
                  )
                }
              />
              {areas.map(({ key: areaKey, color, label }) => (
                <Area
                  key={areaKey}
                  type="monotone"
                  dataKey={areaKey}
                  stroke={color}
                  fill={`url(#gradient-${areaKey})`}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                  name={t(`trending.charts.${label || areaKey}`)}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Botones futuristas */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={prev}
          className="bg-transparent border border-blue-400 text-blue-300 px-4 py-2 rounded-md font-orbitron text-sm shadow hover:bg-blue-500 hover:text-white transition"
        >
          {prevName}
        </button>
        <button
          onClick={next}
          className="bg-transparent border border-green-400 text-green-300 px-4 py-2 rounded-md font-orbitron text-sm shadow hover:bg-green-500 hover:text-white transition"
        >
          {nextName}
        </button>
      </div>
    </section>
  );
}
