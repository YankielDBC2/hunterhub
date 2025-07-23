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
import { getStoreStats } from "@/api/getStoreStats";

export default function TrendingAssetsSectionMobile() {
  const { t } = useTranslation();
  const [timeFilter, setTimeFilter] = useState("24h");
  const [marketplaceData, setMarketplaceData] = useState([]);
  const [hcreditData, setHcreditData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [activeKeys, setActiveKeys] = useState({
    burned: true,
    circulating: true,
    media_value: true,
    fees: true,
    listed: true,
    sold: true,
    hcash: true,
    toncoin: true,
    assets: true,
  });

  const timeFilterMap = {
    "24h": "today",
    "7d": "week",
    "30d": "month",
  };

  useEffect(() => {
    async function fetchData() {
      const filterKey = timeFilterMap[timeFilter]; // ✅ Necesario

      const [marketRes, hcreditRes, storeRes] = await Promise.all([
        getMarketplaceStats(filterKey),
        getHcreditStats(filterKey),
        getStoreStats(filterKey),
      ]);

      if (marketRes.length > 0) setMarketplaceData(marketRes);
      if (hcreditRes.length > 0) setHcreditData(hcreditRes);
      if (storeRes.length > 0) setStoreData(storeRes);
    }

    fetchData();
  }, [timeFilter]);


  const toggleKey = (key) => {
    setActiveKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const chartConfigs = [
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
    {
      key: "store_hub",
      label: (
        <>
          <span className="text-red-500">Store</span>
          <span className="text-white"> HUB</span>
        </>
      ),
      data: storeData,
      areas: [
        { key: "hcash", color: "#FF6B00" },
        { key: "toncoin", color: "#00B2FF" },
        { key: "assets", color: "#16FF6C" },
      ],
    },
  ];

  return (
    <section id="economic-overview" className="lg:hidden px-4 py-6 text-white">
      {/* Sección título + descripción */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-orbitron font-bold tracking-wide">
          <span className="text-red-500">{t("trending.charts.title_red")}</span>
          <span className="text-white"> {t("trending.charts.title_white")}</span>
        </h2>
        <p className="mt-2 text-sm text-gray-300 font-sans leading-relaxed max-w-md mx-auto">
          {t("trending.charts.description")}
        </p>
      </div>
      
      <div className="flex justify-center gap-3 mb-6">
        {["24h", "7d", "30d"].map((time) => (
          <button
            key={time}
            className={`px-3 py-1.5 rounded-md font-orbitron text-xs border-2 transition duration-200
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

      <div className="space-y-10">
        {chartConfigs.map(({ key, label, data, areas }) => (
          <div key={key} className="min-h-[260px]">
            <h3 className="text-sm font-orbitron text-center mb-3">{label}</h3>

            <div className="mb-3 flex justify-center flex-wrap gap-3 text-xs font-semibold">
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

            <ResponsiveContainer
              key={timeFilter}
              width="100%"
              height={220}
              minHeight={220}
              debounce={200}
            >
              <AreaChart data={data}>
                <defs>
                  {areas.map(({ key: areaKey, color }) => (
                    <linearGradient
                      key={areaKey}
                      id={`gradient-${key}-${areaKey}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                      <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="label"
                  stroke="#aaa"
                  fontSize={11}
                  angle={-40}
                  textAnchor="end"
                />
                <YAxis stroke="#aaa" fontSize={11} />
                <Tooltip
                  wrapperStyle={{ zIndex: 50 }}
                  isAnimationActive={false}
                  cursor={{ stroke: "#888", strokeDasharray: "3 3" }}
                  content={({ active, payload }) =>
                    active && payload ? (
                      <div className="bg-gray-900 border border-white/10 rounded-lg p-3 shadow-lg text-sm text-white font-mono">
                        {payload.map((entry, i) => (
                          <div key={i} style={{ color: entry.stroke }}>
                            {
                              t(
                                `trending.charts.${Object.keys(entry.payload).find(
                                  (k) => entry.payload[k] === entry.value
                                )}`
                              )
                            }: {entry.value}
                          </div>
                        ))}
                        <div className="text-gray-400 mt-1 text-xs">
                          {payload?.[0]?.payload?.fullLabel}
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
                      fill={`url(#gradient-${key}-${areaKey})`}
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                      name={t(`trending.charts.${areaKey}`)}
                      isAnimationActive={true}
                      animationDuration={800}
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
