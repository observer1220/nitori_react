interface ProductType {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  stock: number;
  status: string;
  category_id: number;
}

interface CategoryType {
  id: number;
  name: string;
}

export type { ProductType, CategoryType };
