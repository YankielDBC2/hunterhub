export async function getMarketplaceStats(filter = "today") {
  const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = encodeURIComponent(
    `https://api.hunterhub.online/api/public/marketplace/stats?filter=${filter}`
  );
  const fullUrl = `${proxyUrl}${targetUrl}`;

  try {
    const res = await fetch(fullUrl);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error fetching Marketplace stats:", err);
    return null;
  }
}
