import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

const login = async (name: string, passwd: string) => {
  try {
    const response = await axios.post("/login", {
      name,
      passwd,
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const changePassword = async (id: number, passwd: string) => {
  try {
    const response = await axios.put(`/login/${id}`, { passwd });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { login, changePassword };
