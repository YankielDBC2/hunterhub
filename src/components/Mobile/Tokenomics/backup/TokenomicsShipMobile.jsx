import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./TokenomicsShipMobile.css";

const shipLayout = [
  "0000001000000",
  "0000011100000",
  "0000011100000",
  "0000111110000",
  "0000111110000",
  "0001111111000",
  "0000111110000",
  "0001111111000",
  "0001111111000",
  "0000111110000",
  "0001111111000",
  "1001111111001",
  "1111111111111",
  "1111111111111",
  "1101111111101",
  "0000111110000",
  "0000011100000",
  "0000011100000",
  "0000111110000",
  "0001111111000",
  "0000011100000",
  "0000001000000",
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
      <h2 className="tokenomics-title">TOKENOMICS</h2>

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

      {/* Nave con escala 0.3 */}
      <div className="ship-scale-wrapper">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5px",
            transform: "scale(0.3)",
            transformOrigin: "center center",
          }}
        >
          {shipLayout.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                gap: "0.5px",
                justifyContent: "center",
              }}
            >
              {row.split("").map((cell, colIndex) => {
                const zone = getZoneByCell(rowIndex, colIndex);
                const isHighlighted = zone && zone.id === activeZone;

                return (
                  <div
                    key={colIndex}
                    style={{
                      width: "1.5px",
                      height: "1.5px",
                      backgroundColor: isHighlighted
                        ? zone.color
                        : zone
                        ? `${zone.color}22`
                        : "#132235",
                      borderRadius: "1px",
                      opacity: cell === "1" ? (zone ? 1 : 0.25) : 0,
                      boxShadow: isHighlighted
                        ? `0 0 10px ${zone.color}, 0 0 16px ${zone.color}88`
                        : "",
                      transform: isHighlighted ? "scale(1.2)" : "",
                      zIndex: isHighlighted ? 2 : 1,
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => zone && setActiveZone(zone.id)}
                  />
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Botones de zonas */}
      <div className="tokenomics-ledger">
        {tooltipData.map((zone) => (
          <button
            key={zone.id}
            className={`ledger-button ${activeZone === zone.id ? "active" : ""}`}
            style={{
              borderColor: zone.color,
              color: zone.color,
              backgroundColor: activeZone === zone.id ? `${zone.color}22` : "transparent",
            }}
            onClick={() => setActiveZone(zone.id)}
          >
            {zone.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TokenomicsShipMobile;
