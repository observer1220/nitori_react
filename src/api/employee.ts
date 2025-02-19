import axios from "axios";
axios.defaults.baseURL = "http://64.176.37.84:3000";

const fetchEmployees = async () => {
  try {
    const response = await axios.get("/employees", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const addEmployee = async (product: any) => {
  try {
    const response = await axios.post("/employees", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const editEmployee = async (id: number | undefined, product: any) => {
  try {
    const response = await axios.put(`/employees/${id}`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

const deleteEmployee = async (id: number) => {
  try {
    const response = await axios.delete(`/employees/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Request Error:", error);
  }
};

export { fetchEmployees, addEmployee, editEmployee, deleteEmployee };
