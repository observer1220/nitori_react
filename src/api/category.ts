import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

const fetchCategories = async () => {
  try {
    const response = await axios.get("/categories", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const addCategory = async (product: any) => {
  try {
    const response = await axios.post("/categories", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const editCategory = async (id: number | undefined, product: any) => {
  try {
    const response = await axios.put(`/categories/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const deleteCategory = async (id: number) => {
  try {
    const response = await axios.delete(`/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { fetchCategories, addCategory, editCategory, deleteCategory };
