// Transfer 1000000 to 1,000,000
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { formatNumber };
