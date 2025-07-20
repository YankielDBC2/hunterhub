import React from "react";

const formatNumber = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num;
};

const iconMap = {
  expected: "📊",
  mined: "⛏️",
  planned: "📅",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1f1f2e] border border-cyan-400 p-3 rounded-lg shadow-lg text-sm text-white font-medium space-y-1">
        <div className="text-cyan-300 text-base">{label}</div>
        {payload.map((entry) => (
          <div key={entry.dataKey} className="flex items-center gap-2">
            <span>{iconMap[entry.dataKey]}</span>
            <span>{entry.name}:</span>
            <span className="text-cyan-100">{formatNumber(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
