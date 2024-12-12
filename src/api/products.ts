import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

// 取得商品列表
const fetchProducts = async () => {
  try {
    const response = await axios.get("/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

// 新增商品
const addProduct = async (product: any) => {
  try {
    const response = await axios.post("/products", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

// 編輯商品
const editProduct = async (id: number, product: any) => {
  try {
    const response = await axios.put(`/products/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

// 刪除商品
const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`/products/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { fetchProducts, addProduct, editProduct, deleteProduct };
