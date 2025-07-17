import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const stats = {
  hunterCredit: [
    { time: "08:00", burned: 1.5, circulating: 1.0, mediaValue: 0.5 },
    { time: "10:00", burned: 1.7, circulating: 0.8, mediaValue: 0.9 },
    { time: "12:00", burned: 0.3, circulating: 0.6, mediaValue: 1.2 },
    { time: "14:00", burned: 0.9, circulating: 1.1, mediaValue: 1.4 },
    { time: "16:00", burned: 1.6, circulating: 0.9, mediaValue: 1.1 },
  ],
  marketplace: [
    { time: "08:00", hcash: 1.5, listed: 1.0, sold: 0.5 },
    { time: "10:00", hcash: 1.7, listed: 0.8, sold: 0.9 },
    { time: "12:00", hcash: 0.3, listed: 0.6, sold: 1.2 },
    { time: "14:00", hcash: 0.9, listed: 1.1, sold: 1.4 },
    { time: "16:00", hcash: 1.6, listed: 0.9, sold: 1.1 },
  ],
  store: [
    { time: "08:00", hcash: 1.5, users: 1.0, transactions: 0.5 },
    { time: "10:00", hcash: 1.7, users: 0.8, transactions: 0.9 },
    { time: "12:00", hcash: 0.3, users: 0.6, transactions: 1.2 },
    { time: "14:00", hcash: 0.9, users: 1.1, transactions: 1.4 },
    { time: "16:00", hcash: 1.6, users: 0.9, transactions: 1.1 },
  ],
};

const ChartCard = ({ title, data, areas }) => (
  <motion.div
    className="w-full max-w-md"
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.5 }}
  >
    <h3
      className="text-white text-[18px] font-orbitron mb-4"
      dangerouslySetInnerHTML={{ __html: title }}
    />
    <ResponsiveContainer width="95%" height={240}>
      <AreaChart data={data}>
        <XAxis dataKey="time" stroke="#888" fontSize={11} />
        <YAxis stroke="#888" fontSize={11} domain={[0, 2]} />
        <Tooltip />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <defs>
          {areas.map(({ key, color }) => (
            <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        {areas.map(({ key, color, name }) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            fill={`url(#gradient-${key})`}
            strokeWidth={2.5}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name={name}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </motion.div>
);

const TrendingAssetsSection = () => {
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 12;
  const tempItems = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    name: "Orichalcum Metal",
    quantity: 122,
    value: 122599,
    image: "/images/YggdrasilWood.png",
  }));
  const totalPages = Math.ceil(tempItems.length / ITEMS_PER_PAGE);
  const paginatedItems = tempItems.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <section className="relative py-20 px-4 text-white overflow-hidden">
    
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row justify-center items-start gap-8 mb-20">
          <ChartCard
            title='<span class="text-red-500">Hunter Credit</span> - HCREDIT'
            data={stats.hunterCredit}
            areas={[
              { key: "burned", color: "#FF0000", name: "Burned" },
              { key: "circulating", color: "#177DDC", name: "Circulating" },
              { key: "mediaValue", color: "#02FD2A", name: "Media Value" },
            ]}
          />
          <ChartCard
            title='<span class="text-red-500">Marketplace</span> HUB'
            data={stats.marketplace}
            areas={[
              { key: "hcash", color: "#ffaa00", name: "HCASH" },
              { key: "listed", color: "#177DDC", name: "Listed" },
              { key: "sold", color: "#02FD2A", name: "Sold" },
            ]}
          />
          <ChartCard
            title='<span class="text-red-500">Store</span> HUB'
            data={stats.store}
            areas={[
              { key: "hcash", color: "#ffaa00", name: "HCASH" },
              { key: "users", color: "#3399ff", name: "Users" },
              { key: "transactions", color: "#33ff66", name: "Transactions" },
            ]}
          />
        </div>

        <h3 className="text-1.5xl font-orbitron font-bold text-left mb-3">
          Trending <span className="text-red-500">Assets</span> Cap
        </h3>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {paginatedItems.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center gap-3 bg-[#1c1b29] border border-red-600 rounded px-3 py-2 w-full hover:shadow-red-500/20 hover:shadow transition"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-contain"
              />
              <div className="text-white text-[13px]">
                <div className="font-semibold">{item.name}</div>
                <div className="flex gap-4 mt-1 items-center">
                  <div className="flex items-center gap-1">
                    <img src="/images/inventory_icon.png" alt="supply" className="w-4 h-4" />
                    {item.quantity}
                  </div>
                  <div className="flex items-center gap-1">
                    <img src="/images/HCASH001.png" alt="value" className="w-4 h-4" />
                    {item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-end mt-6 gap-2 items-center">
          <button
            className="w-10 h-10 rounded border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          >
            ←
          </button>
          <button
            className="w-10 h-10 rounded border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingAssetsSection;
