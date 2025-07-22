// src/api/getHoldersVolumeTransactions.js
import axios from 'axios';

export const getHoldersVolumeTransactions = async () => {
  try {
    const response = await axios.get('/api/public/stats/tokens');
    const hcash = response.data.data.find((t) => t.token === 'HCASH');

    if (!hcash || !hcash.on_chain) return null;

    return {
      // BARRAS:
      total_supply: hcash.on_chain.total_supply ?? 0,     // 334,147.46
      mined: hcash.total ?? 0,                            // 1,759,606
      burned: hcash.burned ?? 0,                          // 1,423,086
      ingame_circulating: hcash.circulating ?? 0,         // 281,678
      onchain_circulating: hcash.on_chain.circulating ?? 0, // 105,369.55

      // TARJETAS:
      holders: hcash.on_chain.holders ?? 0,
      transactions: hcash.on_chain.transactions ?? 0,
      volume_total: hcash.on_chain.volume_total ?? 0,
    };
  } catch (err) {
    console.error("Error loading HCASH stats", err);
    return null;
  }
};
