const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/hcash-metrics", (req, res) => {
  try {
    const data = fs.readFileSync("./data/hcash_metrics.json");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "HCASH stats unavailable" });
  }
});

module.exports = router;
