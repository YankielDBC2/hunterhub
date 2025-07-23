import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ZoomTooltip from "../utils/ZoomTooltip";

const formatNumber = (num) => {
  if (!num) return "0";
  const n = parseFloat(num);
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(0);
};

const MvpAssetsDesktop = () => {
  const { t } = useTranslation();
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState("today");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [page, setPage] = useState(1);
  const [zoomedImg, setZoomedImg] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const totalPages = Math.ceil(assets.length / itemsPerPage);
  const startIdx = (page - 1) * itemsPerPage;
  const paginatedAssets = assets.slice(startIdx, startIdx + itemsPerPage);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://corsproxy.io/?https://api.hunterhub.online/api/public/marketplace/sales?filter=${filter}`
      );
      const json = await res.json();
      if (json?.data?.interval_data) {
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

  useEffect(() => {
    fetchAssets();
  }, [filter]);

  return (
    <section className="py-10 px-8 text-white flex flex-col items-center">
      <div className="w-full max-w-[1600px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold font-orbitron">{t("mvp_assets.title")}</h2>
          <div className="flex gap-3 items-center">
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

            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="ml-4 px-3 py-1 bg-gray-800 border border-cyan-400 rounded-md text-sm"
            >
              {[10, 20, 30, 50].map((num) => (
                <option key={num} value={num}>
                  Show {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="text-gray-400 text-sm">{t("mvp_assets.loading")}</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {!loading && paginatedAssets.length === 0 && (
          <p className="text-gray-400 text-sm">{t("mvp_assets.empty")}</p>
        )}

        <div className="grid grid-cols-6 gap-6">
          {paginatedAssets.map((item, i) => {
            const index = startIdx + i;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-cyan-600 rounded-xl p-4 shadow-md hover:shadow-cyan-500/20 transition duration-300"
              >
                <div
                  className="w-40 h-40 mb-3 mx-auto relative"
                  onMouseEnter={() => setZoomedImg(item.img || "/images/default_item.png")}
                  onMouseLeave={() => setZoomedImg(null)}
                  onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
                >
                  <img
                    src={item.img || "/images/default_item.png"}
                    alt={item.item}
                    className="w-full h-full object-contain rounded"
                    onError={(e) => (e.target.src = "/images/default_item.png")}
                  />
                </div>

                <div className="text-xs text-gray-400 mt-1 text-center">
                {item.description?.length > 0 ? (
                    <span className="inline">
                    {expandedIndexes.includes(index)
                        ? item.description
                        : `${item.description.split(" ").slice(0, 3).join(" ")}...`}
                    <button
                        onClick={() =>
                        setExpandedIndexes((prev) =>
                            prev.includes(index)
                            ? prev.filter((i) => i !== index)
                            : [...prev, index]
                        )
                        }
                        className="ml-1 text-cyan-400 underline text-[11px]"
                    >
                        {expandedIndexes.includes(index) ? "Read less" : "Read more"}
                    </button>
                    </span>
                ) : (
                    "-"
                )}
                </div>


                <div className="flex justify-between items-center text-xs text-gray-300 mt-4">
                  <div
                    className="flex items-center gap-1"
                    data-tooltip-id={`tooltip-count-${index}`}
                    data-tooltip-content={t("mvp_assets.tooltip.supply")}
                  >
                    <img src="/images/inventory_icon.png" alt="count" className="w-7 h-6" />
                    <span className="text-[1.15rem] font-semibold">{formatNumber(item.count)}</span>
                  </div>

                  <div
                    className="flex items-center gap-1"
                    data-tooltip-id={`tooltip-vol-${index}`}
                    data-tooltip-content={t("mvp_assets.tooltip.value")}
                  >
                    <img src="/images/HCASH001.png" alt="volume" className="w-7 h-6" />
                    <span className="text-[1.15rem] font-semibold">{formatNumber(item.total_volume)}</span>
                  </div>

                  <span className="text-cyan-400">{filter.toUpperCase()}</span>
                </div>

                <Tooltip id={`tooltip-count-${index}`} className="text-xs" />
                <Tooltip id={`tooltip-vol-${index}`} className="text-xs" />
              </div>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-4 text-sm">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className={`px-4 py-1 rounded-md border-2 font-mono ${
                page === 1
                  ? "border-gray-600 bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "border-cyan-400 bg-cyan-700 text-white"
              }`}
            >
              Prev
            </button>
            <span className="mt-1">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className={`px-4 py-1 rounded-md border-2 font-mono ${
                page === totalPages
                  ? "border-gray-600 bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "border-cyan-400 bg-cyan-700 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <ZoomTooltip
        src={zoomedImg}
        visible={!!zoomedImg}
        x={cursorPos.x}
        y={cursorPos.y}
      />
    </section>
  );
};

export default MvpAssetsDesktop;
