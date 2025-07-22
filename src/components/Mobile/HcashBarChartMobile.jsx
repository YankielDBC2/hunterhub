import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";

export default function HcashBarChart({ data, activeKeys }) {
  const { t } = useTranslation();

  const chartKeys = [
    { key: "holders", color: "#FF4D4F" },
    { key: "volume", color: "#4DA6FF" },
    { key: "transactions", color: "#00FF88" },
  ];

  if (!data || data.length === 0) return null; // 👈 Previene render si aún no hay datos

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="label"
          stroke="#aaa"
          fontSize={10}
          angle={-30}
          textAnchor="end"
        />
        <YAxis stroke="#aaa" fontSize={11} />
        <Tooltip
          wrapperStyle={{ zIndex: 50 }}
          content={({ payload }) => {
            const item = payload?.[0]?.payload;
            if (!item) return null;

            return (
              <div className="bg-gray-900 border border-white/10 rounded-lg p-3 shadow-lg text-sm text-white font-mono">
                {chartKeys
                  .filter(({ key }) => activeKeys[key])
                  .map(({ key, color }) => (
                    <div key={key} style={{ color }}>
                      {t(`trending.charts.${key}`)}:{" "}
                      {item[key]?.toLocaleString?.() ?? "—"}
                    </div>
                  ))}
              </div>
            );
          }}
        />
        {chartKeys.map(({ key, color }) =>
          activeKeys[key] ? (
            <Bar
              key={key}
              dataKey={key}
              fill={color}
              name={t(`trending.charts.${key}`)}
              barSize={20}
            />
          ) : null
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
