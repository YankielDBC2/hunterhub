// src/api/getHcreditStats.js
import { formatGraphLabels } from "@/utils/formatLabel";

export async function getHcreditStats(filter = "today") {
  const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = encodeURIComponent(
    `https://api.hunterhub.online/api/public/hcredit/stats?filter=${filter}`
  );
  const fullUrl = `${proxyUrl}${targetUrl}`;

  try {
    const res = await fetch(fullUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const data = json.data;

    if (!data || !data.burned || !data.circulating || !data.hcredit_average_value)
      return [];

    const merged = {};

    for (const entry of data.burned) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        burned: parseFloat(entry.value.toFixed(1)),
      };
    }

    for (const entry of data.circulating) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        circulating: parseFloat(entry.value.toFixed(1)),
      };
    }

    for (const entry of data.hcredit_average_value) {
      merged[entry.interval] = {
        ...merged[entry.interval],
        time: entry.interval,
        media_value: parseFloat(entry.value.toFixed(6)),
      };
    }

    // 🔍 Asegura que los datos estén ordenados cronológicamente
    const sorted = Object.values(merged).sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );

    // ✅ DEBUG: Verifica cuántos puntos llegan
    console.log("Filtro activo:", filter, "Puntos:", sorted.length);

    return sorted.map((item) => ({
      ...item,
      label: formatGraphLabels(item.time, filter, "xAxis"),
      fullLabel: formatGraphLabels(item.time, filter, "tooltip"),
    }));
  } catch (err) {
    console.error("Error fetching HCREDIT stats:", err);
    return [];
  }
}
