const fetch = require("node-fetch");

const TON_API_KEY = process.env.TONAPI_KEY;
const JETTON_CONTRACT = "0:8d1bdf55eef9ae24e96b021f73990bfaf07c55db52dd1ce6c1d87ebd0cc4d4f3";
const EXCLUDED_WALLET = "0:84f547d42f4bba6415d6212b7f71fd4ac26e88d5fb18c0da973f06266ba2372a";

let cachedStats = {};
const CACHE_DURATION_MS = 60 * 1000; // 1 minuto

async function fetchHcashStats(req, res) {
  const now = Date.now();
  const range = req.query.range || '24h';

  if (cachedStats[range] && now - cachedStats[range].timestamp < CACHE_DURATION_MS) {
    return res.json(cachedStats[range].data);
  }

  console.log(`📊 Obteniendo estadísticas HCASH para rango: ${range}`);

  try {
    const gameRes = await fetch("https://api.hunterhub.online/api/public/stats/tokens");
    if (!gameRes.ok) throw new Error("HunterHub API failed");
    const gameData = await gameRes.json();

    const hcash = gameData.find(entry => entry.token === "HCASH");
    if (!hcash) throw new Error("HCASH not found in HunterHub data");

    const mined = hcash.total;
    const burned = hcash.burned;
    const circulatingInGame = hcash.circulating;

    const tonRes = await fetch(`https://tonapi.io/v2/jettons/${JETTON_CONTRACT}`, {
      headers: { Authorization: `Bearer ${TON_API_KEY}` }
    });
    if (!tonRes.ok) throw new Error("TON API jetton fetch failed");
    const tonData = await tonRes.json();

    const totalSupply = Number(tonData.total_supply) / 10 ** tonData.decimals;
    const holders = tonData.holders_count || 0;

    const vaultRes = await fetch(`https://tonapi.io/v2/accounts/${EXCLUDED_WALLET}/jettons`, {
      headers: { Authorization: `Bearer ${TON_API_KEY}` }
    });
    if (!vaultRes.ok) throw new Error("TON API vault fetch failed");
    const vaultData = await vaultRes.json();

    const excluded = vaultData.balances.find(j => j.jetton.address === JETTON_CONTRACT);
    const excludedBalance = excluded ? Number(excluded.balance) / 10 ** excluded.jetton.decimals : 0;
    const circulatingOnChain = totalSupply - excludedBalance;

    let transactions = 0;
    let page = 0;
    const limit = 1000;
    let keepFetching = true;

    let minTimestamp = 0;
    if (range === '24h') {
      minTimestamp = Date.now() / 1000 - 86400;
    } else if (range === '7d') {
      minTimestamp = Date.now() / 1000 - 7 * 86400;
    } else if (range === '30d') {
      minTimestamp = Date.now() / 1000 - 30 * 86400;
    }

    try {
      while (keepFetching) {
        const txRes = await fetch(`https://tonapi.io/v2/jettons/${JETTON_CONTRACT}/transfers?limit=${limit}&offset=${page * limit}`, {
          headers: { Authorization: `Bearer ${TON_API_KEY}` }
        });

        if (!txRes.ok) throw new Error("TON API transfer fetch failed");

        const txData = await txRes.json();
        const transfers = txData.transfers || [];

        const validTransfers = transfers.filter(tx => tx.timestamp >= minTimestamp);
        transactions += validTransfers.length;

        if (transfers.length < limit || validTransfers.length === 0) {
          keepFetching = false;
        } else {
          page++;
        }
      }
    } catch (err) {
      console.warn("⚠️ Error leyendo transacciones:", err.message);
    }

    const result = {
      lastUpdated: new Date().toISOString(),
      maxSupply: 1000000000,
      minted: totalSupply,
      mined,
      spent: burned,
      circulatingInGame,
      circulatingOnChain,
      holders,
      transactions,
      users: 900
    };

    cachedStats[range] = {
      timestamp: now,
      data: result
    };

    return res.json(result);

  } catch (err) {
    console.error("❌ ERROR:", err);
    return res.status(500).json({ error: err.message || "Error retrieving HCASH data" });
  }
}

module.exports = { fetchHcashStats };
