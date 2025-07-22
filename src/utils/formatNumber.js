export const formatNumber = (num, fractionDigits = 2) => {
  if (typeof num !== "number" || isNaN(num)) return "0";
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  });
};
