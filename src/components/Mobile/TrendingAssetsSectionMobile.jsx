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
import { getHcreditStats } from "@/api/getHcreditStats";

const timeFilterMap = {
  "24h": "today",
  "7d": "week",
  "30d": "month",
};

const colors = {
  fees: "#ffaa00",
  listed: "#177DDC",
  sold: "#02FD2A",
  burned: "#FF0000",
  circulating: "#177DDC",
  media_value: "#02FD2A",
};

export default function TrendingAssetsSectionMobile() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0); // hunter_credit
  const [timeFilter, setTimeFilter] = useState("24h");
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [hcreditData, setHcreditData] = useState([]);

  const charts = [
    {
      key: "hunter_credit",
      data: hcreditData,
      areas: [
        { key: "burned", color: colors.burned },
        { key: "circulating", color: colors.circulating },
        { key: "media_value", color: colors.media_value },
      ],
    },
    {
      key: "marketplace",
      data: marketplaceData,
      areas: [
        { key: "fees", color: colors.fees },
        { key: "listed", color: colors.listed },
        { key: "sold", color: colors.sold },
      ],
    },
  ];

  const { key, data, areas } = charts[current];
  const title = t(`trending.charts.${key}`) || key;
  const prevName = t(`trending.pagination.prev`);
  const nextName = t(`trending.pagination.next`);
  const translatedTitle = t("trending.title") || "Trending Assets";
  const titleParts = translatedTitle.split(" ");

  const next = () => setCurrent((prev) => (prev + 1) % charts.length);
  const prev = () => setCurrent((prev) => (prev - 1 + charts.length) % charts.length);

  useEffect(() => {
    if (key === "marketplace") {
      getMarketplaceStats(timeFilterMap[timeFilter]).then((result) => {
        if (Array.isArray(result)) setMarketplaceData(result);
      });
    }
    if (key === "hunter_credit") {
      getHcreditStats(timeFilterMap[timeFilter]).then((result) => {
        if (Array.isArray(result)) setHcreditData(result);
      });
    }
  }, [timeFilter, key]);

  return (
    <section className="lg:hidden px-4 py-10 text-white text-center relative z-10">
      <h2 className="text-2xl font-orbitron font-bold leading-snug mb-1">
        <span className="text-red-500">{titleParts[0]}</span>{" "}
        {titleParts.slice(1).join(" ")}
      </h2>

      <p className="text-sm text-gray-300 mb-4 max-w-sm mx-auto">
        {t("trending.description")}
      </p>

      {key === "marketplace" || key === "hunter_credit" ? (
        <div className="flex justify-center gap-2 mb-4">
          {["24h", "7d", "30d"].map((time) => (
            <button
              key={time}
              className={`px-3 py-1 rounded text-sm font-semibold border-2 transition duration-200 ${
                timeFilter === time
                  ? "border-cyan-400 text-cyan-300 bg-cyan-900 shadow-inner shadow-cyan-500/20"
                  : "border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-white"
              }`}
              onClick={() => setTimeFilter(time)}
            >
              {time.toUpperCase()}
            </button>
          ))}
        </div>
      ) : null}

      <h3 className="text-white text-sm font-orbitron mb-2">{title}</h3>

      <div className="flex justify-center items-center gap-4 mb-3 text-xs font-semibold">
        {areas.map(({ key: areaKey, color }) => (
          <div key={areaKey} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: color }}
            />
            <span>{t(`trending.charts.${areaKey}`)}</span>
          </div>
        ))}
      </div>

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
              <XAxis dataKey="label" stroke="#aaa" fontSize={11} />
              <YAxis stroke="#aaa" fontSize={11} />
              <Tooltip
                isAnimationActive={false}
                content={({ active, payload, label }) =>
                  active && payload ? (
                    <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 shadow-xl text-sm text-white font-mono space-y-1">
                      <div className="text-cyan-300">{label}</div>
                      {payload.map((entry, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span style={{ color: entry.stroke }}>{entry.name}</span>
                          <span>{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null
                }
              />
              {areas.map(({ key, color }) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={color}
                  fill={`url(#gradient-${key})`}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                  name={t(`trending.charts.${key}`)}
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
