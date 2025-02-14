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

export { fetchCategories };
