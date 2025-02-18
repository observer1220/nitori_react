import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

const fetchSuppliers = async () => {
  try {
    const response = await axios.get("/suppliers", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const addSupplier = async (product: any) => {
  try {
    const response = await axios.post("/suppliers", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const editSupplier = async (id: number | undefined, product: any) => {
  try {
    const response = await axios.put(`/suppliers/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const deleteSupplier = async (id: number) => {
  try {
    const response = await axios.delete(`/suppliers/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { fetchSuppliers, addSupplier, editSupplier, deleteSupplier };
