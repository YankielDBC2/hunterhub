// src/api/getStoreStats.js
import { formatGraphLabels } from "@/utils/formatLabel";

export async function getStoreStats(filter = "month") {
  const url = `/api/public/store/stats?filter=${filter}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data;

    if (!data || !data.volume_hcash || !data.volume_toncoin || !data.assets)
      return [];

    const merged = {};

    for (const entry of data.volume_hcash) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        hcash: parseFloat(entry.value.toFixed(1)),
      };
    }

    for (const entry of data.volume_toncoin) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        toncoin: parseFloat(entry.value.toFixed(1)),
      };
    }

    for (const entry of data.assets) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        assets: (merged[entry.interval]?.assets || 0) + entry.value,
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
    console.error("Error fetching Store stats:", err);
    return [];
  }
}
