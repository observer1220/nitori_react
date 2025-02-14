const stock_status = {
  available: "販售中",
  out_of_stock: "暫停販售",
  discontinued: "已下架",
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
    name: "倉庫及庫存管理",
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

export { stock_status, pathList };
