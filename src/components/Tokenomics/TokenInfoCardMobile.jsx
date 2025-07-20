import React from "react";
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
import "./TokenInfoCardMobile.css";

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
      y={y - 8}
      fill={fill}
      fontSize={12}
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
    const year = `Y${i + 1}`;
    const mined = i === 0 ? minedYear1 : 0;
    const expected = i === 0 ? parseFloat(expectedYear1) : 0;
    data.push({ year, planned, expected, mined });
    planned *= 0.91;
  }

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <div className="rounded-2xl p-4 w-full max-w-[95%] bg-[rgba(255,255,255,0.03)] backdrop-blur-md">
        <h2 className="text-[24px] text-center mb-5 text-[#00f0ff] font-[Orbitron] drop-shadow-[0_0_8px_#00f0ff88]">
          {t("tokenomics.title")}
        </h2>

        <div className="text-white text-[15px] leading-[1.6] px-1 mb-6 font-sans">
          <p>
            <strong>{t("tokenomics.name")}:</strong> Hunter Cash
          </p>
          <p>
            <strong>{t("tokenomics.symbol")}:</strong> $HCASH
          </p>
          <p>
            <strong>{t("tokenomics.maxSupply")}:</strong> 1,000,000,000
          </p>
          <p className="text-[13px] opacity-90 leading-snug mt-2">
            <span className="font-normal">{t("tokenomics.cap")}:</span>{" "}
            {t("tokenomics.capDetail")}
          </p>
        </div>

        <div className="token-chart-mobile">
          <ResponsiveContainer width={600} height={300}>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 5, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="year" tick={{ fill: "#fff", fontSize: 12 }} />
              <YAxis
                tickFormatter={formatNumber}
                domain={[0, 15_000_000]}
                tick={{ fill: "#fff", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#fff", paddingTop: 10 }} />

              <Bar
                dataKey="expected"
                fill="#da7ddf"
                name={t("tokenomics.expected")}
              >
                <LabelList dataKey="expected" content={(props) => <AnimatedLabel {...props} fill="#da7ddf" />} />
              </Bar>
              <Bar
                dataKey="mined"
                fill="#5dffcb"
                name={t("tokenomics.mined")}
              >
                <LabelList dataKey="mined" content={(props) => <AnimatedLabel {...props} fill="#5dffcb" />} />
              </Bar>
              <Bar
                dataKey="planned"
                fill="#03e9f4"
                name={t("tokenomics.planned")}
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
