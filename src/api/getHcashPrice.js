export async function getHcashPrice() {
  const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = encodeURIComponent("https://api.hunterhub.online/api/public/hcash/price");
  const fullUrl = `${proxyUrl}${targetUrl}`;

  try {
    const res = await fetch(fullUrl);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error fetching HCASH price:", err);
    return null;
  }
}
