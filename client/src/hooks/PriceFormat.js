const PriceFormat = () => {
  const formattedPrice = (price) => Number(price).toFixed(2);
  // TODO:implement multi currency logic here (USD to INR)
  return { formattedPrice };
};

export default PriceFormat;
