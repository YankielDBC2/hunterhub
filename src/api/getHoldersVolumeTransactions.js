import axios from "axios";

export const getHoldersVolumeTransactions = async () => {
  try {
    const res = await axios.get("https://api.hunterhub.online/api/public/stats/tokens");
    const hcash = res.data.data.find((t) => t.token === "HCASH");
    if (!hcash) return null;

    const {
      total,
      burned,
      circulating,
      on_chain = {},
    } = hcash;

    const {
      total_supply = 0,
      circulating: onchainCirculating = 0,
      holders = 0,
      transactions = 0,
      volume_total = 0,
    } = on_chain;

    return {
      total,
      burned,
      circulating,
      total_supply,
      onchainCirculating,
      holders,
      transactions,
      volume_total: Number(volume_total.toFixed(2)),
    };
  } catch (err) {
    console.error("Error loading HCASH stats", err);
    return null;
  }
};
