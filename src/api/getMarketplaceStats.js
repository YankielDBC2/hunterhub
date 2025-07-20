export async function getMarketplaceStats(filter = "today") {
  const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = encodeURIComponent(
    `https://api.hunterhub.online/api/public/marketplace/stats?filter=${filter}`
  );
  const fullUrl = `${proxyUrl}${targetUrl}`;

  try {
    const res = await fetch(fullUrl);
    const json = await res.json();
    const data = json.data;

    if (!data || !data.fee || !data.listed || !data.sold) return [];

    // Unificar datos por interval
    const merged = {};

    for (const entry of data.fee) {
      merged[entry.interval] = {
        time: entry.interval,
        fees: parseFloat(entry.value.toFixed(1)) // Mostrar solo 1 decimal
      };
    }

    for (const entry of data.listed) {
      if (!merged[entry.interval]) merged[entry.interval] = { time: entry.interval };
      merged[entry.interval].listed = entry.value;
    }

    for (const entry of data.sold) {
      if (!merged[entry.interval]) merged[entry.interval] = { time: entry.interval };
      merged[entry.interval].sold = entry.value;
    }

    // Generar label legible para tooltip
    return Object.values(merged).map((item) => ({
      ...item,
      label: formatLabel(item.time, filter),
    }));
  } catch (err) {
    console.error("Error fetching Marketplace stats:", err);
    return [];
  }
}

function formatLabel(interval, filter) {
  if (filter === "today") {
    // Mostrar hora militar directamente (ej: "14:00")
    return interval;
  }

  // Para semana y mes, formatear la fecha si incluye día
  const parts = interval.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }); // Ej: "Thu, Jul 18"
  }

  if (parts.length === 2) {
    const [year, month] = parts;
    const date = new Date(`${year}-${month}-01`);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }); // Ej: "Jul 1925"
  }

  return interval; // fallback
}
