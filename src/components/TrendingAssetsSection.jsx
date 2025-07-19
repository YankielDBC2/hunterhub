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
import { useTranslation } from "react-i18next";
import { getMarketplaceStats } from "@/api/getMarketplaceStats";

export default function TrendingAssetsSection() {
  const { t } = useTranslation();
  const [timeFilter, setTimeFilter] = useState("24h");
  const [marketplaceData, setMarketplaceData] = useState([
    { time: "08:00", fees: 1.5, listed: 1.0, sold: 0.5 },
    { time: "10:00", fees: 1.7, listed: 0.8, sold: 0.9 },
    { time: "12:00", fees: 0.3, listed: 0.6, sold: 1.2 },
    { time: "14:00", fees: 0.9, listed: 1.1, sold: 1.4 },
    { time: "16:00", fees: 1.6, listed: 0.9, sold: 1.1 },
  ]);

  const stats = {
    hunter_credit: [
      { time: "08:00", burned: 1.5, circulating: 1.0, media_value: 0.5 },
      { time: "10:00", burned: 1.7, circulating: 0.8, media_value: 0.9 },
      { time: "12:00", burned: 0.3, circulating: 0.6, media_value: 1.2 },
      { time: "14:00", burned: 0.9, circulating: 1.1, media_value: 1.4 },
      { time: "16:00", burned: 1.6, circulating: 0.9, media_value: 1.1 },
    ],
    store: [
      { time: "08:00", hcash: 1.5, users: 1.0, transactions: 0.5 },
      { time: "10:00", hcash: 1.7, users: 0.8, transactions: 0.9 },
      { time: "12:00", hcash: 0.3, users: 0.6, transactions: 1.2 },
      { time: "14:00", hcash: 0.9, users: 1.1, transactions: 1.4 },
      { time: "16:00", hcash: 1.6, users: 0.9, transactions: 1.1 },
    ],
  };

  const timeFilterMap = {
    "24h": "today",
    "7d": "week",
    "30d": "month",
  };

  useEffect(() => {
    async function fetchMarketplaceStats() {
      const response = await getMarketplaceStats(timeFilterMap[timeFilter]);
      if (response) {
        const newPoint = {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          fees: parseFloat(response.fee.toFixed(2)),
          listed: response.listed,
          sold: response.sold,
        };
        const newData = [...marketplaceData.slice(1), newPoint];
        setMarketplaceData(newData);
      }
    }
    fetchMarketplaceStats();
  }, [timeFilter]);

  const chartTitles = [
    {
      key: "hunter_credit",
      label: (
        <>
          <span className="text-red-500">Hunter Credit</span>
          <span className="text-white"> - HCREDIT</span>
        </>
      ),
      data: stats.hunter_credit,
      areas: [
        { key: "burned", color: "#FF0000" },
        { key: "circulating", color: "#177DDC" },
        { key: "media_value", color: "#02FD2A" },
      ],
    },
    {
      key: "marketplace",
      label: (
        <>
          <span className="text-red-500">Marketplace</span>
          <span className="text-white"> HUB</span>
        </>
      ),
      data: marketplaceData,
      areas: [
        { key: "fees", color: "#ffaa00" },
        { key: "listed", color: "#177DDC" },
        { key: "sold", color: "#02FD2A" },
      ],
    },
    {
      key: "store",
      label: (
        <>
          <span className="text-red-500">Store</span>
          <span className="text-white"> HUB</span>
        </>
      ),
      data: stats.store,
      areas: [
        { key: "hcash", color: "#ffaa00" },
        { key: "users", color: "#3399ff" },
        { key: "transactions", color: "#33ff66" },
      ],
    },
  ];

  return (
    <section className="hidden lg:block px-8 py-12 text-white">
      <div className="flex justify-center gap-12 mb-6">
        {chartTitles.map((title, idx) => (
          <h3 key={idx} className="text-sm font-orbitron text-center">
            {title.label}
          </h3>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {["24h", "7d", "30d"].map((time) => (
          <button
            key={time}
            className={`relative px-4 py-1.5 rounded-md font-orbitron text-sm border-2 transition duration-200
              ${
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

      <div className="grid grid-cols-3 gap-8">
        {chartTitles.map(({ key, label, data, areas }) => (
          <div key={key} className="w-full">
            <div className="mb-3 flex justify-center gap-3 text-xs font-semibold">
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
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={data}>
                <defs>
                  {areas.map(({ key, color }) => (
                    <linearGradient
                      key={key}
                      id={`gradient-${key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={color}
                        stopOpacity={0.6}
                      />
                      <stop
                        offset="95%"
                        stopColor={color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis dataKey="time" stroke="#aaa" fontSize={11} />
                <YAxis stroke="#aaa" fontSize={11} />
                <Tooltip
                  wrapperStyle={{ zIndex: 50 }}
                  isAnimationActive={false}
                  cursor={{ stroke: "#888", strokeDasharray: "3 3" }}
                  content={({ active, payload, label }) =>
                    active && payload ? (
                      <div className="bg-gray-900 border border-white/10 rounded-lg p-3 shadow-lg text-sm text-white font-mono">
                        {payload.map((entry, i) => (
                          <div key={i} style={{ color: entry.stroke }}>
                            {entry.name}: {entry.value}
                          </div>
                        ))}
                        <div className="text-gray-400 mt-1 text-xs">
                          {label}
                        </div>
                      </div>
                    ) : null
                  }
                />
                {areas.map(({ key: areaKey, color }) => (
                  <Area
                    key={areaKey}
                    type="monotone"
                    dataKey={areaKey}
                    stroke={color}
                    fill={`url(#gradient-${areaKey})`}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                    name={t(`trending.charts.${areaKey}`)}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </section>
  );
}
