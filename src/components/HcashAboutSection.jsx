import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HCASHIcon from "/images/HCASH_02.png";
import TonIcon from "/images/tonicon.png";
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

export default function HcashAboutSection() {
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
    return chartData[0];
  }, [chartData]);

  return (
    <section className="py-20 px-4 md:px-16 lg:px-32 text-white">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3">
            <img src={HCASHIcon} alt="$HCASH" className="w-10 h-10" />
            <h2 className="text-4xl font-orbitron tracking-wide">
              <span className="text-red-500">{t("about_hcash.about")}</span>{" "}
              <span className="text-white">$HCASH</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 mt-2">{t("about_hcash.hcash_description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="space-y-6">
            {stats.slice(0, 3).map((stat, i) => (
              <StatBar key={i} t={t} {...stat} currentValue={progressValues[i] || 0} />
            ))}
          </div>

          {/* ⬇️ REEMPLAZO DE GRÁFICA POR TARJETAS */}
          <div className="flex flex-col gap-4 w-full">
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
              suffix="USD"
            />
          </div>

          <div className="space-y-6">
            {stats.slice(3).map((stat, i) => (
              <StatBar key={i + 3} t={t} {...stat} currentValue={progressValues[i + 3] || 0} />
            ))}
            <div className="pt-4 flex justify-center">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-semibold text-sm">
                {t("about_hcash.buy_sell")}
                <img src={TonIcon} alt="TonIcon" className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function StatBar({ t, label1, label2, value, total, description, color, currentValue }) {
  const barColor = color === "red" ? "bg-red-500" : "bg-emerald-400";
  const percent = total > 0 ? (currentValue / total) * 100 : 0;

  return (
    <div>
      <p className="font-orbitron font-bold text-sm">
        <span className="text-red-500">{t(label1)}</span>{" "}
        <span className="text-white">{t(label2)}</span>
      </p>
      <div className="w-full h-1.5 bg-gray-700 mt-1 mb-2 relative rounded-sm">
        <div className={`${barColor} h-1.5 absolute top-0 left-0 transition-all duration-300`} style={{ width: `${percent}%` }} />
        <span className="text-emerald-400 text-xs absolute -top-6 right-0 font-mono">{value.toLocaleString()}</span>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{t(description)}</p>
    </div>
  );
}

function InfoCard({ icon, label, value, color, suffix = "" }) {
  return (
    <div className="flex items-center bg-[#0b121d]/90 backdrop-blur-sm border border-[#1a2733] rounded-2xl px-5 py-4 w-full max-w-sm shadow-[0_0_6px_#00ffff20] hover:shadow-[0_0_12px_#00ffff40] transition-all duration-300">
      <img src={icon} alt={label} className="w-10 h-10 mr-4 drop-shadow-md" />
      <div className="flex flex-col">
        <p className="font-orbitron text-sm text-white">{label}</p>
        <p className={`text-xl font-bold mt-1 ${color}`}>
          {(value ?? 0).toLocaleString()} {suffix}
        </p>
      </div>
    </div>
  );
}




