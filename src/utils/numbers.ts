// Transfer 1000000 to 1,000,000
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 3000000000000000 => 0.003;
const formatBNB = (num: number) => {
  return num / 10 ** 18;
};

export { formatNumber, formatBNB };
