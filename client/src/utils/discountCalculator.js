export const discountPercent = (mrp, sellPrice) => {
  return (((mrp - sellPrice) * 100) / sellPrice).toFixed(2);
};
