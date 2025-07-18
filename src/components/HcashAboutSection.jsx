import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

import HCASHIcon from "/images/HCASH_02.png";
import TonIcon from "/images/tonicon.png";

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

export default function HcashAboutSection() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(defaultStats);
  const [progressValues, setProgressValues] = useState(defaultStats.map(() => 0));
  const [chartData, setChartData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [range, setRange] = useState("24h");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/api/hcash?range=${range}`);
        const data = await res.json();

        if (!data || typeof data.minted !== "number") return;

        const updatedStats = [
          { ...defaultStats[0], value: data.minted },
          { ...defaultStats[1], value: data.mined },
          { ...defaultStats[2], value: data.spent, total: data.mined },
          { ...defaultStats[3], value: data.mined - data.spent, total: data.mined },
          { ...defaultStats[4], value: data.circulatingOnChain, total: data.minted },
        ];

        setStats(updatedStats);
        setProgressValues(updatedStats.map(() => 0));
        setChartData(prev => [
          {
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            holders: data.holders,
            transactions: data.transactions,
            users: 900
          },
          ...prev.slice(0, 23)
        ]);
        setLastUpdated(data.lastUpdated || new Date().toISOString());
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const intervalId = setInterval(fetchStats, 60000);
    return () => clearInterval(intervalId);
  }, [range]);

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

  return (
    <section className="py-20 px-4 md:px-16 lg:px-32 relative z-10 text-white">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto">
        <div className="text-center mb-4 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <img src={HCASHIcon} alt="$HCASH" className="w-10 h-10" />
            <h2 className="text-4xl font-orbitron tracking-wide">
              <span className="text-red-500">{t("about_hcash.about")}</span> <span className="text-white">$HCASH</span>
            </h2>
          </div>
        </div>

        <p className="text-base text-gray-300 text-center max-w-3xl mx-auto mb-10">
          {t("about_hcash.hcash_description")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="space-y-6">
            {stats.slice(0, 3).map((stat, i) => (
              <StatBar key={i} t={t} {...stat} currentValue={progressValues[i] || 0} />
            ))}
          </div>

          <div className="h-[360px] relative z-10">
            <div className="flex justify-center gap-2 mb-2">
              {["24h", "7d", "30d", "all"].map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-md border text-sm transition-colors duration-300 ${
                    range === r ? 'bg-green-500 text-white' : 'bg-transparent border-gray-500 text-gray-300'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={chartData} isAnimationActive={false}>
                <defs>
                  <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4da6ff" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#4da6ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#aaa" />
                <YAxis stroke="#aaa" domain={["auto", "auto"]} />
                <Tooltip isAnimationActive={false} content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-900 border border-white/10 rounded-lg p-3 shadow-lg text-sm text-white font-mono">
                        <div><span className="text-red-400">Holders:</span> {data.holders}</div>
                        <div><span className="text-green-400">Transactions:</span> {data.transactions}</div>
                        <div><span className="text-blue-400">Users:</span> {data.users}</div>
                        <div className="text-gray-400 mt-1 text-xs">{data.time}</div>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area type="monotone" dataKey="holders" stroke="#ff4d4f" fill="url(#redGradient)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="users" stroke="#4da6ff" fill="url(#blueGradient)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="transactions" stroke="#00ff88" fill="url(#greenGradient)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
            {lastUpdated && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                Last updated: {new Date(lastUpdated).toLocaleString()}
              </p>
            )}
            {loading && (
              <p className="text-xs text-yellow-400 mt-1 text-center animate-pulse">Loading data...</p>
            )}
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
  const percent = (currentValue / total) * 100;

  return (
    <div>
      <p className="font-orbitron font-bold text-sm">
        <span className="text-red-500">{t(label1)}</span>{" "}
        <span className="text-white">{t(label2)}</span>
      </p>
      <div className="w-full h-1.5 bg-gray-700 relative mt-1 mb-2 rounded-sm">
        <div
          className={`${barColor} h-1.5 rounded-sm absolute left-0 top-0 transition-all duration-300`}
          style={{ width: `${percent}%` }}
        />
        <span className="text-emerald-400 text-xs absolute -top-6 right-0">
          {value.toLocaleString()}
        </span>
      </div>
      <p className="text-xs text-gray-400 leading-relaxed">{t(description)}</p>
    </div>
  );
}
