const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

const JETTON_CONTRACT = 'EQCThN7fVe75riTpawI_c5kM-vbB8sVdt2R3GzmQNhzP1_MB';
const EXCLUDED_OWNER = '0:84f547d42f4bba6415d6212b7f71fd4ac26e88d5fb18c0da973f06266ba2372a';
const TONAPI_KEY = process.env.TONAPI_KEY;

app.use(cors());

app.get('/api/hcash', async (req, res) => {
  try {
    // 1. In-game API
    const gameRes = await axios.get('https://api.hunterhub.online/api/public/stats/tokens');
    const hcash = gameRes.data.data.find(t => t.token === 'HCASH');
    if (!hcash) throw new Error("No HCASH data from game API");

    const { total, burned, circulating } = hcash;

    // 2. On-chain API
    const headers = { Authorization: `Bearer ${TONAPI_KEY}` };
    let minted = 0;
    let onChainCirculating = 0;
    let holders = 0;
    let transactions = 0;

    try {
      // Supply & Holders
      const tonRes = await axios.get(`https://tonapi.io/v2/jettons/${JETTON_CONTRACT}`, { headers });
      minted = parseFloat(tonRes.data.total_supply) / 1e9;
      holders = tonRes.data.holders_count || 0;

      // Vault balance
      const holdersRes = await axios.get(`https://tonapi.io/v2/jettons/${JETTON_CONTRACT}/holders?limit=1000`, { headers });
      const excluded = holdersRes.data.addresses.find(h => h.owner.address === EXCLUDED_OWNER);
      const excludedBalance = excluded ? parseFloat(excluded.balance) / 1e9 : 0;
      onChainCirculating = minted - excludedBalance;

      // Transferencias
      const transfersRes = await axios.get(`https://tonapi.io/v2/jettons/${JETTON_CONTRACT}/transfers?limit=1`, { headers });
      transactions = transfersRes.data.total ?? transfersRes.data.transfers?.length ?? 0;

    } catch (tonError) {
      console.error("❌ TonAPI error:", tonError.response?.data || tonError.message);
    }

    // Porcentajes
    const circulatingPct = (circulating / total) * 100;
    const burnedPct = (burned / total) * 100;
    const otherPct = 100 - circulatingPct - burnedPct;

    // Respuesta
    res.json({
      lastUpdated: new Date().toISOString(),
      maxSupply: 1000000000,
      minted: minted,
      mined: total,
      spent: burned,
      circulatingInGame: circulating,
      circulatingOnChain: onChainCirculating,
      holders: holders,
      transactions: transactions,
      percent: {
        circulating: circulatingPct.toFixed(2),
        burned: burnedPct.toFixed(2),
        other: otherPct.toFixed(2)
      }
    });

  } catch (err) {
    console.error("❌ Error en /api/hcash:", err.message);
    res.status(500).json({ error: "Error retrieving HCASH data" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}/api/hcash`);
});
