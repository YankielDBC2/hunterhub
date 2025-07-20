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
    // Mostrar solo hora (ej. 00:00, 13:00)
    return interval;
  }

  if (filter === "week") {
    // interval: YYYY-MM-DD
    const [year, month, day] = interval.split("-");
    if (day) {
      const date = new Date(`${year}-${month}-${day}`);
      return date.toDateString();
    }
  }

  if (filter === "month") {
    // interval: YYYY-Wxx → convertir a fecha de inicio de semana
    const [year, week] = interval.split("-W");
    if (year && week) {
      const weekNumber = parseInt(week, 10);
      const janFirst = new Date(parseInt(year), 0, 1);
      const firstDay = janFirst.getDay(); // día de la semana (0 = domingo)

      // Calcular el primer lunes del año
      const firstMonday = new Date(janFirst);
      firstMonday.setDate(janFirst.getDate() + ((firstDay <= 4 ? 1 : 8) - firstDay));

      // Calcular fecha correspondiente a la semana
      const resultDate = new Date(firstMonday);
      resultDate.setDate(firstMonday.getDate() + (weekNumber - 1) * 7);

      return resultDate.toDateString(); // Ej: "Mon Jul 15 2025"
    }
  }

  return interval;
}
