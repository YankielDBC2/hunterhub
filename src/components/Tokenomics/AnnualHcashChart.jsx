import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const TOTAL_SUPPLY = 1_000_000_000;
const ANNUAL_CAP_PERCENT = 9;
const MINTED_YEAR_1 = 334_147.46;
const ANNUAL_CAP = (TOTAL_SUPPLY * ANNUAL_CAP_PERCENT) / 100;
const REMAINING_YEAR_1 = ANNUAL_CAP - MINTED_YEAR_1;

const generateData = () => {
  const years = Array.from({ length: 10 }, (_, i) => 2025 + i);
  return years.map((year, index) => {
    if (index === 0) {
      return {
        year: `${year}`,
        mined: MINTED_YEAR_1,
        planned: REMAINING_YEAR_1,
      };
    }
    return {
      year: `${year}`,
      mined: 0,
      planned: ANNUAL_CAP,
    };
  });
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c2c3c] p-3 rounded shadow-lg text-white text-sm">
        <p><strong>{payload[0].payload.year}</strong></p>
        <p>Mined: {payload[0].payload.mined.toLocaleString()} HCASH</p>
        <p>Planned: {payload[0].payload.planned.toLocaleString()} HCASH</p>
      </div>
    );
  }
  return null;
};

const AnnualHcashChart = () => {
  const data = generateData();

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <h3 className="text-center text-xl font-orbitron text-cyan-400 mb-4">
        Annual $HCASH Distribution Plan (10 Years)
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <XAxis dataKey="year" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="planned" stackId="a" fill="#1d3557" />
          <Bar dataKey="mined" stackId="a" fill="#00ff88" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnnualHcashChart;
