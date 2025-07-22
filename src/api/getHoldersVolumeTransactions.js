import axios from 'axios';

export const getHoldersVolumeTransactions = async () => {
  try {
    const response = await axios.get('https://api.hunterhub.online/api/public/hcash/stats?filter=today');
    const { data } = response.data;

    const chartData = data.holders.map((entry, index) => ({
      label: entry.label,
      holders: entry.value,
      transactions: data.transactions[index]?.value || 0,
      volume: data.volume_total[index]?.value || 0,
    }));

    // Calcular totales para stats
    const mined = data.volume_total.reduce((sum, e) => sum + (e?.value || 0), 0);
    const transactions = data.transactions.reduce((sum, e) => sum + (e?.value || 0), 0);
    const holders = data.holders.reduce((sum, e) => sum + (e?.value || 0), 0);

    // Simulación de valores adicionales (puedes reemplazar con API real si existe)
    const spent = Math.round(mined * 0.78); // ejemplo: 78% de lo minado ha sido gastado
    const onchain = 111703.68;              // valor fijo de ejemplo
    const maxSupply = 1_000_000_000;
    const minted = 334_147.46;

    const summary = {
      maxSupply,
      minted,
      mined,
      spent,
      ingame: mined - spent,
      onchain,
    };

    return {
      chart: chartData,
      summary,
    };
  } catch (error) {
    console.error('Error fetching HCASH stats:', error);
    return {
      chart: [],
      summary: null,
    };
  }
};
