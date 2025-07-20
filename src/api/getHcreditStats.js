// src/api/getHcreditStats.js

export async function getHcreditStats(filter = "today") {
  const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = encodeURIComponent(
    `https://api.hunterhub.online/api/public/hcash/stats?filter=${filter}`
  );
  const fullUrl = `${proxyUrl}${targetUrl}`;

  try {
    const res = await fetch(fullUrl);
    const json = await res.json();
    const data = json.data;

    if (!data || !data.burned || !data.circulating || !data.hcredit_average_value)
      return [];

    const merged = {};

    for (const entry of data.burned) {
      merged[entry.interval] = {
        time: entry.interval,
        burned: parseFloat(entry.value.toFixed(1)),
      };
    }

    for (const entry of data.circulating) {
      if (!merged[entry.interval]) merged[entry.interval] = { time: entry.interval };
      merged[entry.interval].circulating = parseFloat(entry.value.toFixed(1));
    }

    for (const entry of data.hcredit_average_value) {
      if (!merged[entry.interval]) merged[entry.interval] = { time: entry.interval };
      merged[entry.interval].media_value = parseFloat(entry.value.toFixed(6));
    }

    return Object.values(merged).map((item) => ({
      ...item,
      label: formatLabel(item.time, filter),
    }));
  } catch (err) {
    console.error("Error fetching HCREDIT stats:", err);
    return [];
  }
}

function formatLabel(interval, filter) {
  if (!interval) return "";

  if (filter === "today") {
    const [, time] = interval.split(" ");
    return time?.slice(0, 5);
  }

  if (filter === "week" || filter === "month") {
    const [year, month, day] = interval.split(" ")[0].split("-");
    return `${day}/${month}`;
  }

  return interval;
}
