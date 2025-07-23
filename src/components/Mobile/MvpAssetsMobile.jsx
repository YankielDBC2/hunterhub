import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const formatNumber = (num) => {
  if (!num) return "0";
  const n = parseFloat(num);
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
};

const ITEMS_PER_PAGE = 5;

const MvpAssetsMobile = () => {
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState("today");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleDescription = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const mergeAssets = (rawAssets) => {
    const grouped = {};
    for (const item of rawAssets) {
      const key = `${item.item}__${item.description}`;
      if (!grouped[key]) {
        grouped[key] = { ...item };
        grouped[key].count = Number(item.count) || 0;
        grouped[key].total_volume = parseFloat(item.total_volume) || 0;
      } else {
        grouped[key].count += Number(item.count) || 0;
        grouped[key].total_volume += parseFloat(item.total_volume) || 0;
      }
    }

    return Object.values(grouped)
      .map((item) => ({
        ...item,
        total_volume: item.total_volume.toFixed(2),
      }))
      .sort((a, b) => b.total_volume - a.total_volume);
  };

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://api.hunterhub.online/api/public/marketplace/sales?filter=${filter}`
      );
      const json = await res.json();
      if (
        json &&
        json.data &&
        Array.isArray(json.data.interval_data)
      ) {
        const merged = mergeAssets(json.data.interval_data);
        setAssets(merged);
        setError("");
        setPage(1);
      } else {
        setAssets([]);
        setError("Unexpected data format.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data.");
      setAssets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [filter]);

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const paginatedAssets = assets.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(assets.length / ITEMS_PER_PAGE);

  return (
    <section className="px-4 mt-10">
      <h2 className="text-center text-2xl font-bold mb-4 font-orbitron tracking-wide">
        Top Selling Items
      </h2>

      {/* Filtros */}
      <div className="flex justify-center gap-3 mb-6">
        {[
          { key: "today", label: "24H" },
          { key: "week", label: "7D" },
          { key: "month", label: "30D" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-1 border-2 rounded-md font-mono text-sm tracking-wide transition-all duration-200 ${
              filter === key
                ? "border-cyan-400 bg-cyan-700 text-white"
                : "border-gray-500 bg-transparent text-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-400 text-sm">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-400 text-sm">{error}</p>
      )}

      <div className="space-y-3">
        {!loading && paginatedAssets.length > 0 ? (
          paginatedAssets.map((item, index) => {
            const globalIndex = startIdx + index;
            const isExpanded = expandedIndexes.includes(globalIndex);
            return (
              <div
                key={index}
                className="flex bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-700 transition-all duration-300"
              >
                <div className="w-20 h-20 shrink-0">
                  <img
                    src={item.img || "/images/default_item.png"}
                    alt={item.item || "Item"}
                    className="w-full h-full object-contain rounded-md"
                    onError={(e) => {
                      e.target.src = "/images/default_item.png";
                    }}
                    data-tooltip-id={`tooltip-${index}`}
                    data-tooltip-content={item.description || "No description"}
                  />
                  <Tooltip
                    id={`tooltip-${index}`}
                    className="text-xs max-w-[200px]"
                  />
                </div>

                <div className="ml-3 flex flex-col justify-between w-full text-sm text-white">
                  <div>
                    <h3 className="font-semibold text-base leading-snug font-orbitron">
                      {item.item}
                    </h3>
                    <p
                      className={`text-gray-400 text-xs mt-1 leading-tight ${
                        isExpanded ? "" : "line-clamp-1"
                      }`}
                    >
                      {item.description}
                    </p>
                    {item.description.length > 50 && (
                      <button
                        onClick={() => toggleDescription(globalIndex)}
                        className="text-cyan-400 text-xs mt-1 underline"
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </button>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs text-gray-300">
                    <div className="flex gap-1 items-center">
                      <img
                        src="/images/inventory_icon.png"
                        alt="Count"
                        className="w-4 h-4"
                      />
                      <span>{formatNumber(item.count)}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <img
                        src="/images/HCASH001.png"
                        alt="Volume"
                        className="w-4 h-4"
                      />
                      <span>{formatNumber(item.total_volume)}</span>
                    </div>
                    <span className="text-cyan-400 ml-2">
                      {filter.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          !loading && (
            <p className="text-center text-gray-400 text-sm">
              No assets available.
            </p>
          )
        )}
      </div>

      {/* Paginado con mismo estilo que los filtros */}
      {assets.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-6 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-1 border-2 rounded-md font-mono text-sm tracking-wide transition-all duration-200 ${
              page === 1
                ? "border-gray-600 bg-gray-700 text-gray-400 cursor-not-allowed"
                : "border-cyan-400 bg-cyan-700 text-white"
            }`}
          >
            Prev
          </button>
          <span className="text-sm text-white mt-1">
            Page {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-1 border-2 rounded-md font-mono text-sm tracking-wide transition-all duration-200 ${
              page === totalPages
                ? "border-gray-600 bg-gray-700 text-gray-400 cursor-not-allowed"
                : "border-cyan-400 bg-cyan-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default MvpAssetsMobile;
