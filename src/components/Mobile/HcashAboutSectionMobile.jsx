import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import HCASHIcon from "/images/HCASH_02.png";
import { getHoldersVolumeTransactions } from "@/api/getHoldersVolumeTransactions";

const fallbackStats = [
  {
    label1: "about_hcash.max_supply_label1",
    label2: "about_hcash.max_supply_label2",
    value: 334147.46,
    total: 1000000000,
    description: "about_hcash.max_supply_desc",
    color: "emerald",
  },
  {
    label1: "about_hcash.tokens_mined_label1",
    label2: "about_hcash.tokens_mined_label2",
    value: 1759606,
    total: 1000000000,
    description: "about_hcash.tokens_mined_desc",
    color: "emerald",
  },
  {
    label1: "about_hcash.tokens_spent_label1",
    label2: "about_hcash.tokens_spent_label2",
    value: 1423086,
    total: 1759606,
    description: "about_hcash.tokens_spent_desc",
    color: "red",
  },
  {
    label1: "about_hcash.tokens_ingame_label1",
    label2: "about_hcash.tokens_ingame_label2",
    value: 281678,
    total: 1759606,
    description: "about_hcash.tokens_ingame_desc",
    color: "emerald",
  },
  {
    label1: "about_hcash.tokens_onchain_label1",
    label2: "about_hcash.tokens_onchain_label2",
    value: 105369.55,
    total: 334147.46,
    description: "about_hcash.tokens_onchain_desc",
    color: "emerald",
  },
];

export default function HcashAboutSectionMobile() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(fallbackStats);
  const [progressValues, setProgressValues] = useState(fallbackStats.map(() => 0));
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHoldersVolumeTransactions();
      if (!data) return;

      const updatedStats = [
        {
          label1: "about_hcash.max_supply_label1",
          label2: "about_hcash.max_supply_label2",
          value: data.total_supply,
          total: 1000000000,
          description: "about_hcash.max_supply_desc",
          color: "emerald",
        },
        {
          label1: "about_hcash.tokens_mined_label1",
          label2: "about_hcash.tokens_mined_label2",
          value: data.mined,
          total: 1000000000,
          description: "about_hcash.tokens_mined_desc",
          color: "emerald",
        },
        {
          label1: "about_hcash.tokens_spent_label1",
          label2: "about_hcash.tokens_spent_label2",
          value: data.burned,
          total: data.mined,
          description: "about_hcash.tokens_spent_desc",
          color: "red",
        },
        {
          label1: "about_hcash.tokens_ingame_label1",
          label2: "about_hcash.tokens_ingame_label2",
          value: data.ingame_circulating,
          total: data.mined,
          description: "about_hcash.tokens_ingame_desc",
          color: "emerald",
        },
        {
          label1: "about_hcash.tokens_onchain_label1",
          label2: "about_hcash.tokens_onchain_label2",
          value: data.onchain_circulating,
          total: data.total_supply,
          description: "about_hcash.tokens_onchain_desc",
          color: "emerald",
        },
      ];

      setStats(updatedStats);
      setProgressValues(updatedStats.map(() => 0));

      setChartData([
        {
          holders: data.holders,
          transactions: data.transactions,
          volume: data.volume_total,
        },
      ]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValues((prev) =>
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

  const latestEntry = useMemo(() => {
    if (!chartData.length) return null;
    return chartData[chartData.length - 1];
  }, [chartData]);

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

      <div className="mt-10 space-y-6">
        <h3 className="text-sm font-orbitron text-center mb-3">
          <span className="text-cyan-400">HCASH</span>{" "}
          <span className="text-white">Real-Time Stats</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <InfoCard
            icon="/images/holders_icon.png"
            label={t("trending.charts.holders")}
            value={latestEntry?.holders || 0}
            color="text-green-400"
          />
          <InfoCard
            icon="/images/transactions_icon.png"
            label={t("trending.charts.transactions")}
            value={latestEntry?.transactions || 0}
            color="text-pink-400"
          />
          <InfoCard
            icon="/images/volume_icon.png"
            label={t("trending.charts.volume")}
            value={latestEntry?.volume || 0}
            color="text-blue-400"
            suffix="HCASH"
          />
        </div>
      </div>
    </section>
  );
}

function StatBar({ t, label1, label2, value, total, description, color, currentValue }) {
  const barColor = color === "red" ? "bg-red-500" : "bg-emerald-400";
  const percent = total > 0 ? (currentValue / total) * 100 : 0;

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
          {(value ?? 0).toLocaleString()}
        </span>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed text-justify px-1">
        {t(description)}
      </p>
    </div>
  );
}

function InfoCard({ icon, label, value, color, suffix = "" }) {
  return (
    <div className="flex flex-col items-center bg-white/5 p-4 rounded-2xl shadow-lg">
      <img src={icon} alt={label} className="w-16 h-16 mb-3 animate-pulse" />
      <p className="font-orbitron text-xs text-gray-300">{label}</p>
      <p className={`text-xl font-bold mt-1 ${color}`}>
        {(value ?? 0).toLocaleString()} {suffix}
      </p>
    </div>
  );
}
