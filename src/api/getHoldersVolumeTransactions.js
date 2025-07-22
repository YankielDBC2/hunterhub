// src/api/getHoldersVolumeTransactions.js
import axios from 'axios';

export const getHoldersVolumeTransactions = async () => {
  try {
    const response = await axios.get('/api/public/stats/tokens');
    const hcash = response.data.data.find((t) => t.token === 'HCASH');

    if (!hcash || !hcash.on_chain) return null;

    return {
      // BARRAS:
      total_supply: hcash.on_chain.total_supply ?? 0,
      mined: hcash.total ?? 0,
      burned: hcash.burned ?? 0,
      ingame_circulating: hcash.circulating ?? 0,
      onchain_circulating: hcash.on_chain.circulating ?? 0,

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
