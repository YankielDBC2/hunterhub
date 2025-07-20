import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./TokenomicsShipMobile.css";

const shipLayout = [
  "000000000001111000000000",
  "000000000000110000000000",
  "000000000000111000000000",
  "000001011011111000001100",
  "000111111111111100101100",
  "011111111111111111111110",
  "111111111111111111111111",
  "011111111111111111111110",
  "000111111111111100101100",
  "000001011011111000001100",
  "000000000000111000000000",
  "000000000000110000000000",
  "000000000001111000000000",
];

const percentageData = [
  { id: "zoneD", label: "Players 💰", content: "70% for Games and Player Incentives", color: "#4af55f", percent: 70 },
  { id: "zoneE", label: "Marketing 📢", content: "6.5% for Marketing Efforts", color: "#fa63e8", percent: 6.5 },
  { id: "zoneF", label: "Liquidity 💧", content: "3.5% for Liquidity Pools", color: "#2ec1ff", percent: 3.5 },
  { id: "zoneG", label: "Innovation 🚀", content: "15% for Innovation and Expansion", color: "#ffa500", percent: 15 },
  { id: "zoneH", label: "Partners 🤝", content: "5% for Partners and Investors", color: "#9933ff", percent: 5 },
  { id: "zoneI", label: "Team 🧠", content: "The team holds 0 tokens", color: "#ffffff", percent: 0 },
];

const TokenomicsShipMobile = () => {
  const [activeZone, setActiveZone] = useState(null);

  const activeCells = [];
  shipLayout.forEach((row, y) =>
    row.split("").forEach((val, x) => {
      if (val === "1") activeCells.push([y, x]);
    })
  );

  const totalCells = activeCells.length;
  const tooltipData = [];
  let index = 0;

  percentageData.forEach((zone) => {
    const count = Math.round((zone.percent / 100) * totalCells);
    const cells = activeCells.slice(index, index + count);
    tooltipData.push({ ...zone, cells });
    index += count;
  });

  const currentData = tooltipData.find((z) => z.id === activeZone);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveZone((prev) => {
        const idx = tooltipData.findIndex((z) => z.id === prev);
        return tooltipData[(idx + 1) % tooltipData.length].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [tooltipData]);

  const getZoneByCell = (row, col) =>
    tooltipData.find((z) => z.cells.some(([r, c]) => r === row && c === col));

  return (
    <div className="tokenomics-ship-wrapper">
      <motion.h2
        className="tokenomics-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        TOKENOMICS
      </motion.h2>

      {/* Tooltip */}
      <div className="tooltip-static-container">
        {currentData && (
          <div
            className="tooltip-static"
            style={{
              backgroundColor: `${currentData.color}22`,
              border: `1px solid ${currentData.color}88`,
            }}
          >
            <div className="tooltip-title">{currentData.label}</div>
            <div className="tooltip-content">{currentData.content}</div>
          </div>
        )}
      </div>

      {/* Nave escalada */}
      <div className="ship-scale-wrapper">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            transform: "scale(0.6)",
            transformOrigin: "center center",
          }}
        >
          {shipLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="ship-row">
              {row.split("").map((cell, colIndex) => {
                const zone = getZoneByCell(rowIndex, colIndex);
                const isHighlighted = zone && zone.id === activeZone;

                return (
                  <div
                    key={colIndex}
                    className={`ship-cell ${cell === "1" ? "visible" : ""}`}
                    style={{
                      backgroundColor: isHighlighted
                        ? zone.color
                        : zone
                        ? `${zone.color}22`
                        : "#132235",
                      opacity: cell === "1" ? (zone ? 1 : 0.3) : 0,
                      boxShadow: isHighlighted
                        ? `0 0 10px ${zone.color}, 0 0 16px ${zone.color}88`
                        : "",
                      transform: isHighlighted ? "scale(1.2)" : "",
                      zIndex: isHighlighted ? 2 : 1,
                    }}
                    onMouseEnter={() => zone && setActiveZone(zone.id)}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Botones en 2 columnas x 3 filas */}
      <motion.div
        className="tokenomics-buttons-grid"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
      >
        {tooltipData.map((zone, i) => (
          <motion.button
            key={zone.id}
            className={`tokenomics-button ${activeZone === zone.id ? "active" : ""}`}
            style={{
              borderColor: zone.color,
              color: zone.color,
              backgroundColor: activeZone === zone.id ? `${zone.color}22` : "transparent",
            }}
            onClick={() => setActiveZone(zone.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            {zone.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default TokenomicsShipMobile;
