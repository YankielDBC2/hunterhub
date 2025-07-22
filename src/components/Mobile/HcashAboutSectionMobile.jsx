import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HCASHIcon from "/images/HCASH_02.png";
import { getHoldersVolumeTransactions } from "../../api/getHoldersVolumeTransactions";
import HcashBarChart from "./HcashBarChartMobile";

const defaultStats = [
  {
    label1: "about_hcash.max_supply_label1",
    label2: "about_hcash.max_supply_label2",
    value: 334147.46,
    total: 1000000000,
    description: "about_hcash.max_supply_desc",
    color: "emerald"
  },
  {
    label1: "about_hcash.tokens_mined_label1",
    label2: "about_hcash.tokens_mined_label2",
    value: 1646888,
    total: 1000000000,
    description: "about_hcash.tokens_mined_desc",
    color: "emerald"
  },
  {
    label1: "about_hcash.tokens_spent_label1",
    label2: "about_hcash.tokens_spent_label2",
    value: 1284968,
    total: 1646888,
    description: "about_hcash.tokens_spent_desc",
    color: "red"
  },
  {
    label1: "about_hcash.tokens_ingame_label1",
    label2: "about_hcash.tokens_ingame_label2",
    value: 1646888 - 1284968,
    total: 1646888,
    description: "about_hcash.tokens_ingame_desc",
    color: "emerald"
  },
  {
    label1: "about_hcash.tokens_onchain_label1",
    label2: "about_hcash.tokens_onchain_label2",
    value: 111703.68,
    total: 334147.46,
    description: "about_hcash.tokens_onchain_desc",
    color: "emerald"
  }
];

export default function HcashAboutSectionMobile() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(defaultStats);
  const [progressValues, setProgressValues] = useState(defaultStats.map(() => 0));
  const [chartData, setChartData] = useState([]);
  const [activeKeys, setActiveKeys] = useState({
    holders: true,
    transactions: true,
    volume: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getHoldersVolumeTransactions();
        if (data && data.length > 0) setChartData(data);
      } catch (err) {
        console.error("Error fetching HCASH stats:", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValues(prev =>
        stats.map((stat, i) => {
          const current = prev[i] || 0;
          const target = stat.value;
          const increment = Math.ceil(target / 20);
          return current < target ? Math.min(current + increment, target) : current;
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [stats]);

  const toggleKey = (key) => {
    setActiveKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const chartKeys = [
    { key: "holders", color: "#FF4D4F" },
    { key: "volume", color: "#4DA6FF" },
    { key: "transactions", color: "#00FF88" },
  ];

  return (
    <section className="py-10 px-4 text-white">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2">
          <img src={HCASHIcon} alt="$HCASH" className="w-6 h-6" />
          <h2 className="text-xl font-orbitron tracking-wide">
            <span className="text-red-500">{t("about_hcash.about")}</span>{" "}
            <span className="text-white">$HCASH</span>
          </h2>
        </div>
        <p className="text-xs text-gray-400 mt-2 px-2">
          {t("about_hcash.hcash_description")}
        </p>
      </div>

      <div className="space-y-4">
        {stats.map((stat, i) => (
          <StatBar key={i} t={t} {...stat} currentValue={progressValues[i] || 0} />
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-sm font-orbitron text-center mb-3">
          <span className="text-cyan-400">HCASH</span>{" "}
          <span className="text-white">Distribution</span>
        </h3>

        <div className="mb-3 flex justify-center flex-wrap gap-3 text-xs font-semibold">
          {chartKeys.map(({ key, color }) => (
            <div
              key={key}
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => toggleKey(key)}
            >
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: activeKeys[key] ? color : "#444" }}
              />
              <span className={activeKeys[key] ? "" : "opacity-40 line-through"}>
                {t(`trending.charts.${key}`)}
              </span>
            </div>
          ))}
        </div>

        <HcashBarChart data={chartData} activeKeys={activeKeys} />
      </div>
    </section>
  );
}

function StatBar({ t, label1, label2, value, total, description, color, currentValue }) {
  const barColor = color === "red" ? "bg-red-500" : "bg-emerald-400";
  const percent = (currentValue / total) * 100;

  return (
    <div className="px-2">
      <p className="font-orbitron font-bold text-sm mb-1">
        <span className="text-red-500">{t(label1)}</span>{" "}
        <span className="text-white">{t(label2)}</span>
      </p>

      <div className="w-full h-3 bg-gray-700 rounded relative overflow-hidden">
        <div
          className={`${barColor} h-full rounded transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="text-right mt-1 mb-2">
        <span className="text-emerald-400 text-xs font-mono">
          {value.toLocaleString()}
        </span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed text-justify px-1">
        {t(description)}
      </p>
    </div>
  );
}
