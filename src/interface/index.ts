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

interface InventoryType {}

interface CustomerType {}

interface OrderType {}

interface OrderItemType {}

interface EmployeeType {}

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
};
