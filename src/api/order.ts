import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

const fetchOrders = async () => {
  try {
    const response = await axios.get("/orders", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const addOrder = async (product: any) => {
  try {
    const response = await axios.post("/orders", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const editOrder = async (id: number | undefined, product: any) => {
  try {
    const response = await axios.put(`/orders/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const deleteOrder = async (id: number) => {
  try {
    const response = await axios.delete(`/orders/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { fetchOrders, addOrder, editOrder, deleteOrder };
