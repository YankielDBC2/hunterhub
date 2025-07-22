// src/api/getHcashPrice.js

export async function getHcashPrice() {
  const url = "/api/public/hcash/price";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error fetching HCASH price:", err);
    return null;
  }
}
