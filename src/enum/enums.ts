const StockStatus = {
  available: "販售中",
  out_of_stock: "暫停販售",
  discontinued: "已下架",
};

const OrderStatus = {
  pending: "待處理",
  paid: "已付款",
  shipped: "已出貨",
  cancelled: "已取消",
  completed: "已完成", // 資料庫沒有這個狀態
};

const pathList = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "產品管理",
    path: "/products",
  },
  {
    name: "分類管理",
    path: "/categories",
  },
  {
    name: "供應商管理",
    path: "/suppliers",
  },
  {
    name: "倉庫管理",
    path: "/warehouses",
  },
  {
    name: "訂單管理",
    path: "/orders",
  },
  {
    name: "顧客管理",
    path: "/customers",
  },
  {
    name: "員工管理",
    path: "/employees",
  },
];

export { StockStatus, OrderStatus, pathList };
