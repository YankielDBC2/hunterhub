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
import { getHcreditStats } from "@/api/getHcreditStats";

export default function TrendingAssetsSection() {
  const { t } = useTranslation();
  const [timeFilter, setTimeFilter] = useState("24h");
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [hcreditData, setHcreditData] = useState([]);

  const [activeKeys, setActiveKeys] = useState({
    burned: true,
    circulating: true,
    media_value: true,
    fees: true,
    listed: true,
    sold: true,
    hcash: true,
    users: true,
    transactions: true,
  });

  const timeFilterMap = {
    "24h": "today",
    "7d": "week",
    "30d": "month",
  };

  useEffect(() => {
    async function fetchData() {
      const [marketRes, hcreditRes] = await Promise.all([
        getMarketplaceStats(timeFilterMap[timeFilter]),
        getHcreditStats(timeFilterMap[timeFilter]),
      ]);
      if (marketRes.length > 0) setMarketplaceData(marketRes);
      if (hcreditRes.length > 0) setHcreditData(hcreditRes);
    }
    fetchData();
  }, [timeFilter]);

  const toggleKey = (key) => {
    setActiveKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const chartTitles = [
    {
      key: "hunter_credit",
      label: (
        <>
          <span className="text-red-500">Hunter Credit</span>
          <span className="text-white"> - HCREDIT</span>
        </>
      ),
      data: hcreditData,
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
  ];

  return (
    <section className="hidden lg:block px-8 py-12 text-white">
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

      <div className="grid grid-cols-2 gap-8">
        {chartTitles.map(({ key, label, data, areas }) => (
          <div key={key} className="w-full">
            <h3 className="text-sm font-orbitron text-center mb-3">{label}</h3>

            <div className="mb-3 flex justify-center gap-3 text-xs font-semibold">
              {areas.map(({ key: areaKey, color }) => (
                <div
                  key={areaKey}
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => toggleKey(areaKey)}
                >
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{
                      backgroundColor: activeKeys[areaKey] ? color : "#444",
                    }}
                  />
                  <span
                    className={
                      activeKeys[areaKey] ? "" : "opacity-40 line-through"
                    }
                  >
                    {t(`trending.charts.${areaKey}`)}
                  </span>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={data}>
                <defs>
                  {areas.map(({ key: areaKey, color }) => (
                    <linearGradient
                      key={areaKey}
                      id={`gradient-${areaKey}`}
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
                <XAxis dataKey="label" stroke="#aaa" fontSize={11} />
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
                {areas.map(({ key: areaKey, color }) =>
                  activeKeys[areaKey] ? (
                    <Area
                      key={areaKey}
                      type="monotone"
                      connectNulls={true}
                      dataKey={areaKey}
                      stroke={color}
                      fill={`url(#gradient-${areaKey})`}
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                      name={t(`trending.charts.${areaKey}`)}
                    />
                  ) : null
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </section>
  );
}
