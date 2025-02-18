import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

const fetchWarehouses = async () => {
  try {
    const response = await axios.get("/warehouses", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const addWarehouse = async (product: any) => {
  try {
    const response = await axios.post("/warehouses", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const editWarehouse = async (id: number | undefined, product: any) => {
  try {
    const response = await axios.put(`/warehouses/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const deleteWarehouse = async (id: number) => {
  try {
    const response = await axios.delete(`/warehouses/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { fetchWarehouses, addWarehouse, editWarehouse, deleteWarehouse };
