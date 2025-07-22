// src/api/getMarketplaceStats.js
import { formatGraphLabels } from "@/utils/formatLabel";

export async function getMarketplaceStats(filter = "today") {
  const url = `/api/public/marketplace/stats?filter=${filter}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data;

    if (!data || !data.fee || !data.listed || !data.sold) return [];

    const merged = {};

    for (const entry of data.fee) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        fees: parseFloat(entry.value.toFixed(1)),
      };
    }

    for (const entry of data.listed) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        listed: entry.value,
      };
    }

    for (const entry of data.sold) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        sold: entry.value,
      };
    }

    const sorted = Object.values(merged).sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );

    return sorted.map((item) => ({
      ...item,
      label: formatGraphLabels(item.time, filter, "xAxis"),
      fullLabel: formatGraphLabels(item.time, filter, "tooltip"),
    }));
  } catch (err) {
    console.error("Error fetching Marketplace stats:", err);
    return [];
  }
}
