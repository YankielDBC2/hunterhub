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

const MvpAssetsMobile = () => {
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState("today");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://corsproxy.io/?https://api.hunterhub.online/api/public/marketplace/sales?interval=${filter}`
        );
        const json = await res.json();
        setAssets(json.data || []);
        setError("");
      } catch (err) {
        setError("Error fetching data.");
        setAssets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [filter]);

  return (
    <section className="px-4 mt-10">
      <h2 className="text-left text-2xl font-bold mb-4">Top Selling Items</h2>

      {/* Botones de filtro */}
      <div className="flex justify-center gap-2 mb-6">
        {["today", "week", "month"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 rounded-full border transition-all duration-200 ${
              filter === type
                ? "bg-white text-black font-bold"
                : "bg-gray-700 text-white"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-400 text-sm">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-400 text-sm">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {!loading && assets?.length > 0 ? (
          assets.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-700"
            >
              <div className="relative">
                {item.img ? (
                  <>
                    <img
                      src={item.img}
                      alt={item.item}
                      className="w-full h-auto rounded-xl"
                      data-tooltip-id={`desc-${index}`}
                      data-tooltip-content={item.description}
                      onError={(e) => {
                        e.target.src = "/images/default_item.png";
                      }}
                    />
                    <Tooltip
                      id={`desc-${index}`}
                      place="top"
                      className="z-50 max-w-[220px] text-xs"
                    />
                  </>
                ) : (
                  <div className="w-full h-28 bg-gray-700 rounded-xl" />
                )}
              </div>

              <h3 className="text-lg mt-3 font-semibold text-white">
                {item.item || "Unnamed"}
              </h3>

              <div className="flex justify-between mt-2 text-sm text-gray-300">
                <div className="flex gap-1 items-center">
                  <img
                    src="/images/inventory_icon.png"
                    alt="Count"
                    className="w-5 h-5"
                  />
                  <span>{formatNumber(item.count)}</span>
                </div>
                <div className="flex gap-1 items-center">
                  <img
                    src="/images/HCASH001.png"
                    alt="Volume"
                    className="w-5 h-5"
                  />
                  <span>{formatNumber(item.total_volume)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-sm text-gray-400 col-span-2 text-center">
              No assets available.
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default MvpAssetsMobile;
