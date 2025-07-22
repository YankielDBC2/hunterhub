import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHoldersVolumeTransactions } from "@/api/getHoldersVolumeTransactions";
import { formatNumber } from "@/utils/formatNumber";

const Bar = ({ label, value, max }) => {
  const percent = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-sm font-semibold text-green-400">{formatNumber(value)}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700 ease-in-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

const HcashBarChartMobile = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(null);

  useEffect(() => {
    getHoldersVolumeTransactions().then((stats) => {
      if (stats) setData(stats);
    });
  }, []);

  if (!data) return null;

  const {
    total_supply,
    mined,
    burned,
    ingame_circulating,
    onchain_circulating,
  } = data;

  const bars = [
    {
      label: t("hcash.bars.supply"),
      value: total_supply,
    },
    {
      label: t("hcash.bars.mined"),
      value: mined,
    },
    {
      label: t("hcash.bars.burned"),
      value: burned,
    },
    {
      label: t("hcash.bars.circulating"),
      value: ingame_circulating,
    },
    {
      label: t("hcash.bars.onchain"),
      value: onchain_circulating,
    },
  ];

  const maxValue = Math.max(...bars.map((bar) => bar.value));

  return (
    <div className="w-full px-4 mt-6">
      {bars.map((bar, idx) => (
        <Bar key={idx} label={bar.label} value={bar.value} max={maxValue} />
      ))}
    </div>
  );
};

export default HcashBarChartMobile;
