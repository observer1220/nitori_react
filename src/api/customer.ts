import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

const fetchCustomers = async () => {
  try {
    const response = await axios.get("/customers", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const addCustomer = async (product: any) => {
  try {
    const response = await axios.post("/customers", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const editCustomer = async (id: number | undefined, product: any) => {
  try {
    const response = await axios.put(`/customers/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const deleteCustomer = async (id: number) => {
  try {
    const response = await axios.delete(`/customers/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { fetchCustomers, addCustomer, editCustomer, deleteCustomer };
