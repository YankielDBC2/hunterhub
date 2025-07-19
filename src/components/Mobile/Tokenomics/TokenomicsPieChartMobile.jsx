import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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

// Leyenda personalizada en 2 filas de 3
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
            <span className="text-xs font-orbitron text-white">{entry.value}</span>
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
            <span className="text-xs font-orbitron text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TokenomicsPieChartMobile = () => {
  return (
    <div className="w-full px-4 py-6">
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
            outerRadius={100}
            innerRadius={40}
            labelLine={true}
            label={renderCustomLabel}
          >
            {percentageData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{
              backgroundColor: "#0d1620",
              border: "1px solid #333",
              color: "#fff",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "12px",
            }}
          />

          <Legend content={renderCustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenomicsPieChartMobile;
