// Transfer 1000000 to 1,000,000
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Transfer 2025-02-18T00:00:00.000Z to 2025-02-18 00:00:00
const formatDate = (date: string) => {
  return date.replace("T", " ").replace(".000Z", "");
};

export { formatNumber, formatDate };
