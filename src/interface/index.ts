interface ProductType {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  stock: number;
  status: string;
  category_id: number;
  supplier_id: number;
}

interface CategoryType {
  id: number;
  name: string;
}

interface SupplierType {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface WarehousesType {
  id: number;
  location: string;
  capacity: string;
}

interface InventoryType {
  id: number;
  product_id: number;
  warehouse_id: number;
  quantity: number;
}

interface CustomerType {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

interface OrderType {
  id: number;
  customer_id: number;
  order_date: string;
  status: string;
  total_price: string;
}

interface OrderItemType {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
}

interface EmployeeType {
  id: number;
  name: string;
  position: string;
  warehouse_id: string;
}

interface LoginType {
  name: string | null;
  passwd: string;
}

type Order = "asc" | "desc";

export type {
  ProductType,
  CategoryType,
  SupplierType,
  WarehousesType,
  InventoryType,
  CustomerType,
  OrderType,
  OrderItemType,
  EmployeeType,
  Order,
  LoginType,
};
