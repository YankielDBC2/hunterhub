import React, { useState, useEffect } from "react";
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
import { getMarketplaceStats } from "@/api/getMarketplaceStats";
import MvpAssetsMobile from "./MvpAssetsMobile";

const defaultMarketplaceData = [
  { time: "08:00", fees: 1.5, listed: 1.0, sold: 0.5 },
  { time: "10:00", fees: 1.7, listed: 0.8, sold: 0.9 },
  { time: "12:00", fees: 0.3, listed: 0.6, sold: 1.2 },
  { time: "14:00", fees: 0.9, listed: 1.1, sold: 1.4 },
  { time: "16:00", fees: 1.6, listed: 0.9, sold: 1.1 },
];

const timeFilterMap = {
  "24h": "today",
  "7d": "week",
  "30d": "month",
};

export default function TrendingAssetsSectionMobile() {
  const [current, setCurrent] = useState(0);
  const [timeFilter, setTimeFilter] = useState("24h");
  const [marketplaceData, setMarketplaceData] = useState(defaultMarketplaceData);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchMarketplaceStats() {
      const response = await getMarketplaceStats(timeFilterMap[timeFilter]);
      if (!response || !Array.isArray(response)) return;

      const formatted = response.map((entry) => {
        const dateObj = new Date(entry.interval || entry.time);
        return {
          time:
            timeFilter === "24h"
              ? dateObj.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) // HH:mm
              : dateObj.toISOString(), // use ISO for later parsing
          fees: entry.fees,
          listed: entry.listed,
          sold: entry.sold,
        };
      });

      setMarketplaceData(formatted);
    }

    fetchMarketplaceStats();
  }, [timeFilter]);

  const stats = {
    hunter_credit: defaultMarketplaceData,
    store: defaultMarketplaceData,
  };

  const charts = [
    {
      key: "hunter_credit",
      data: stats.hunter_credit,
      areas: [
        { key: "burned", color: "#FF0000" },
        { key: "circulating", color: "#177DDC" },
        { key: "media_value", color: "#02FD2A" },
      ],
    },
    {
      key: "marketplace",
      data: marketplaceData,
      areas: [
        { key: "fees", color: "#ffaa00" },
        { key: "listed", color: "#177DDC" },
        { key: "sold", color: "#02FD2A" },
      ],
    },
    {
      key: "store",
      data: stats.store,
      areas: [
        { key: "hcash", color: "#ffaa00" },
        { key: "users", color: "#3399ff" },
        { key: "transactions", color: "#33ff66" },
      ],
    },
  ];

  const next = () => setCurrent((prev) => (prev + 1) % charts.length);
  const prev = () => setCurrent((prev) => (prev - 1 + charts.length) % charts.length);

  const { key, data, areas } = charts[current];
  const title = t(`trending.charts.${key}`) || key;
  const prevName = t(`trending.charts.${charts[(current - 1 + charts.length) % charts.length].key}`);
  const nextName = t(`trending.charts.${charts[(current + 1) % charts.length].key}`);
  const translatedTitle = t("trending.title") || "Trending Assets";
  const titleParts = translatedTitle.split(" ");

  return (
    <section className="lg:hidden px-4 py-10 text-white text-center relative z-10">
      <h2 className="text-2xl font-orbitron font-bold leading-snug mb-1">
        <span className="text-red-500">{titleParts[0]}</span>{" "}
        {titleParts.slice(1).join(" ")}
      </h2>

      <p className="text-sm text-gray-300 mb-4 max-w-sm mx-auto">{t("trending.description")}</p>

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

      <h3 className="text-white text-sm font-orbitron mb-2">{title}</h3>

      <div className="flex justify-center items-center gap-4 mb-3 text-xs font-semibold">
        {areas.map(({ key: areaKey, color, label }) => (
          <div key={areaKey} className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: color }} />
            <span>{t(`trending.charts.${label || areaKey}`)}</span>
          </div>
        ))}
      </div>

      <motion.div
        className="w-full flex justify-center mb-4 touch-pan-x touch-auto"
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
              <XAxis
                dataKey="time"
                stroke="#aaa"
                fontSize={11}
                tickFormatter={(value) => {
                  if (timeFilter === "24h") return value;
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis stroke="#aaa" fontSize={11} />
              <Tooltip
                isAnimationActive={false}
                content={({ active, payload, label }) =>
                  active && payload ? (
                    <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 shadow-xl text-sm text-white font-mono space-y-1">
                      <div className="text-cyan-300">
                        {new Date(label).toLocaleString("en-GB")}
                      </div>
                      {payload.map((entry, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span style={{ color: entry.stroke }}>{entry.name}</span>
                          <span className="text-white">
                            {typeof entry.value === "number"
                              ? entry.value.toFixed(1)
                              : entry.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null
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
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  name={t(`trending.charts.${label || areaKey}`)}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="flex justify-center gap-4 mt-4 mb-6">
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

      <MvpAssetsMobile />
    </section>
  );
}
