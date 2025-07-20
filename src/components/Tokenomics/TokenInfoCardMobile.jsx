import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { useSpring, animated } from "react-spring";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import CustomTooltip from "./CustomTooltip";

// Cambiar tamaño de las barras
const formatNumber = (num) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num;
};

const AnimatedLabel = ({ x, y, value, fill }) => {
  const props = useSpring({
    from: { val: 0 },
    to: { val: value },
    config: { tension: 120, friction: 20 },
  });
  return (
    <animated.text
      x={x}
      y={y - 10}
      fill={fill}
      fontSize={14}
      textAnchor="middle"
    >
      {props.val.to((v) => formatNumber(v))}
    </animated.text>
  );
};

const TokenInfoCardMobile = () => {
  const { t } = useTranslation();
  const minedYear1 = 334147.46;
  const launchDate = dayjs("2025-04-01");
  const today = dayjs();
  const daysPassed = today.diff(launchDate, "day");
  const expectedYear1 = ((minedYear1 / daysPassed) * 365).toFixed(2);

  const totalSupply = 1_000_000_000;
  let planned = 0.09 * totalSupply;

  const data = [];
  for (let i = 0; i < 10; i++) {
    const year = `Year ${i + 1}`;
    const mined = i === 0 ? minedYear1 : 0;
    const expected = i === 0 ? parseFloat(expectedYear1) : 0;
    data.push({ year, planned, expected, mined });
    planned *= 0.91;
  }

  // Estado para controlar la visibilidad del tooltip
  const [activeBar, setActiveBar] = useState(null);

  // Función para manejar el clic en las barras
  const handleBarClick = (data) => {
    setActiveBar(data);
  };

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <div className="token-info-card-mobile">
        <h2 className="token-title-mobile">{t("tokenomics.title")}</h2>

        <div className="token-info-list-mobile">
          <p>
            <strong className="font-bold">{t("tokenomics.name")}:</strong> Hunter Cash
          </p>
          <p>
            <strong className="font-bold">{t("tokenomics.symbol")}:</strong> $HCASH
          </p>
          <p>
            <strong className="font-bold">{t("tokenomics.maxSupply")}:</strong> 1,000,000,000
          </p>
          <p style={{ fontSize: "12px" }}>
            <span style={{ fontWeight: "normal" }}>
              {t("tokenomics.cap")}:
            </span>{" "}
            {t("tokenomics.capDetail")}
          </p>
        </div>

        {/* Asegúrate de que el ResponsiveContainer tenga el tamaño correcto */}
        <div className="token-chart-mobile">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" tick={{ fill: "#fff", fontSize: 12 }} />
              <YAxis
                tickFormatter={formatNumber}
                domain={[0, 15_000_000]} // Reducir el rango de las barras
                tick={{ fill: "#fff", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <Legend wrapperStyle={{ color: "#fff", fontSize: 12, paddingTop: "10px" }} />

              {/* Eliminar el onClick temporalmente para ver si el gráfico se renderiza */}
              <Bar
                dataKey="expected"
                fill="#da7ddf"
                name={t("tokenomics.expected")}
                activeBar={{ fill: "#f191ff", radius: [4, 4, 0, 0] }}
              >
                <LabelList dataKey="expected" content={(props) => <AnimatedLabel {...props} fill="#da7ddf" />} />
              </Bar>
              <Bar
                dataKey="mined"
                fill="#5dffcb"
                name={t("tokenomics.mined")}
                activeBar={{ fill: "#88ffe0", radius: [4, 4, 0, 0] }}
              >
                <LabelList dataKey="mined" content={(props) => <AnimatedLabel {...props} fill="#5dffcb" />} />
              </Bar>
              <Bar
                dataKey="planned"
                fill="#03e9f4"
                name={t("tokenomics.planned")}
                activeBar={{ fill: "#51faff", radius: [4, 4, 0, 0] }}
              >
                <LabelList dataKey="planned" content={(props) => <AnimatedLabel {...props} fill="#03e9f4" />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TokenInfoCardMobile;
