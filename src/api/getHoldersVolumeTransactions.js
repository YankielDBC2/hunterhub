// src/api/getHoldersVolumeTransactions.js
import axios from 'axios';

export const getHoldersVolumeTransactions = async () => {
  try {
    const response = await axios.get('https://api.hunterhub.online/api/public/stats/tokens');
    const hcash = response.data.data.find((t) => t.token === 'HCASH');

    if (!hcash || !hcash.on_chain) {
      return {
        holders: 0,
        transactions: 0,
        volume_total: 0,
      };
    }

    return {
      holders: hcash.on_chain.holders ?? 0,
      transactions: hcash.on_chain.transactions ?? 0,
      volume_total: hcash.on_chain.volume_total ?? 0,
    };
  } catch (error) {
    console.error("Error loading HCASH stats", error);
    return {
      holders: 0,
      transactions: 0,
      volume_total: 0,
    };
  }
};
