import React from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

function formatNumber(num) {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num?.toString() || "0";
}

const MvpAssetsMobile = ({ assets = [] }) => {
  const { t } = useTranslation();

  return (
    <section className="px-4 mt-10">
      <h2 className="text-left text-2xl font-bold mb-4">
        {t("mvp_assets.title", "MVP Assets")}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {assets?.length > 0 ? (
          assets.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-700"
            >
              <div className="relative group">
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.name || "asset"}
                      className="w-full h-auto rounded-xl"
                      data-tooltip-id={`img-${index}`}
                      data-tooltip-content={t(
                        "mvp_assets.tooltip.image",
                        "Tap to view a quick description of the item."
                      )}
                      onError={(e) =>
                        (e.target.src = "/images/default_item.png")
                      }
                    />
                    <Tooltip
                      id={`img-${index}`}
                      place="top"
                      className="z-50 max-w-[220px] text-xs"
                    />
                  </>
                ) : (
                  <div className="w-full h-28 bg-gray-700 rounded-xl" />
                )}
              </div>

              <h3 className="text-lg mt-3 font-semibold text-white">
                {item.name || "Unnamed"}
              </h3>

              <div className="flex items-center justify-between mt-2 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <img
                    src="/images/inventory_icon.png"
                    alt="Supply"
                    className="w-5 h-5"
                    data-tooltip-id={`supply-${index}`}
                    data-tooltip-content={t(
                      "mvp_assets.tooltip.supply",
                      "This represents the total supply available of this item across the ecosystem."
                    )}
                  />
                  <span>{formatNumber(item.supply)}</span>
                  <Tooltip
                    id={`supply-${index}`}
                    place="top"
                    className="z-50 max-w-[220px] text-xs"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <img
                    src="/images/HCASH001.png"
                    alt="Value"
                    className="w-5 h-5"
                    data-tooltip-id={`value-${index}`}
                    data-tooltip-content={t(
                      "mvp_assets.tooltip.value",
                      "This is the estimated value of the asset based on recent marketplace activity."
                    )}
                  />
                  <span>{formatNumber(item.value)}</span>
                  <Tooltip
                    id={`value-${index}`}
                    place="top"
                    className="z-50 max-w-[220px] text-xs"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 col-span-2 text-center">
            {t("mvp_assets.empty", "No assets available.")}
          </p>
        )}
      </div>
    </section>
  );
};

export default MvpAssetsMobile;
