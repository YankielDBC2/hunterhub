import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Datos
const percentageData = [
  { id: "zoneD", label: "Players", value: 70, color: "#4af55f" },
  { id: "zoneE", label: "Marketing", value: 6.5, color: "#fa63e8" },
  { id: "zoneF", label: "Liquidity", value: 3.5, color: "#2ec1ff" },
  { id: "zoneG", label: "Innovation", value: 15, color: "#ffa500" },
  { id: "zoneH", label: "Partners", value: 5, color: "#9933ff" },
  { id: "zoneI", label: "Team 0%", value: 0.01, color: "#ffffff" },
];

// Etiqueta de porcentaje
const renderCustomLabel = ({ percent }) =>
  percent > 0 ? `${(percent * 100).toFixed(0)}%` : null;

// Leyenda personalizada
const renderCustomLegend = ({ payload }) => {
  if (!payload) return null;
  return (
    <div className="flex flex-col items-center mt-6 space-y-2">
      <div className="flex justify-center space-x-2">
        {payload.slice(0, 3).map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-xs font-orbitron text-white">
              {entry.payload.value}%
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-6">
        {payload.slice(3).map((entry, index) => (
          <div key={`item-${index + 3}`} className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-xs font-orbitron text-white">
              {entry.payload.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TokenomicsPieChartMobile = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliceClick = (data, index) => {
    setActiveIndex(index);
    setShowTooltip(true);

    // Auto-hide after 2 seconds
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  return (
    <div className="w-full px-4 py-6 relative">
      <h2 className="text-center text-xl font-orbitron text-cyan-300 mb-4">
        TOKENOMICS
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={percentageData}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={35}
            labelLine={true}
            label={renderCustomLabel}
            isAnimationActive={false}
            onClick={handleSliceClick}
            onTouchStart={(e) => {
              if (e?.target?.dataset?.index) {
                handleSliceClick(percentageData[e.target.dataset.index], e.target.dataset.index);
              }
            }}
          >
            {percentageData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={index === activeIndex ? "#fff" : ""}
                strokeWidth={index === activeIndex ? 3 : 1}
                cursor="pointer"
                data-index={index}
              />
            ))}
          </Pie>
          <Legend content={renderCustomLegend} />
        </PieChart>
      </ResponsiveContainer>

      {/* Tooltip manual flotante */}
      {showTooltip && activeIndex !== null && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-[110px] z-50"
          style={{
            backgroundColor: "rgba(0, 10, 20, 0.95)",
            border: `1px solid ${percentageData[activeIndex].color}`,
            borderRadius: "8px",
            padding: "8px 12px",
            fontFamily: "Orbitron, sans-serif",
            color: percentageData[activeIndex].color,
            fontSize: "13px",
            boxShadow: `0 0 8px ${percentageData[activeIndex].color}`,
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
            {percentageData[activeIndex].label}
          </div>
          <div>{percentageData[activeIndex].value}%</div>
        </div>
      )}
    </div>
  );
};

export default TokenomicsPieChartMobile;
