import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import "./App.css";
import ProductTable from "./pages/ProductTable";
import SideBar from "./components/SideBar";
import CategoryTable from "./pages/CategoryTable";
import Dashboard from "./pages/Dashboard";
import SupplierTable from "./pages/SupplierTable";
import WarehouseTable from "./pages/WarehouseTable";
import OrderTable from "./pages/OrderTable";
import CustomerTable from "./pages/CustomerTable";
import EmployeeTable from "./pages/EmployeeTable";
import LoginPage from "./pages/LoginPage";
import ToolBar from "./components/ToolBar";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
`;

const MainContent = styled.div`
  overflow: auto;
  min-width: 600px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const token = localStorage.getItem("token");

  // 需驗證 token 是否為後端所發放，避免前端隨意更改
  if (!token && !isLoginPage) {
    return <LoginPage />;
  }

  return isLoginPage ? (
    <LoginPage />
  ) : (
    <Layout>
      <SideBar />
      <MainContent>
        <ToolBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/categories" element={<CategoryTable />} />
          <Route path="/suppliers" element={<SupplierTable />} />
          <Route path="/warehouses" element={<WarehouseTable />} />
          <Route path="/orders" element={<OrderTable />} />
          <Route path="/customers" element={<CustomerTable />} />
          <Route path="/employees" element={<EmployeeTable />} />
        </Routes>
      </MainContent>
    </Layout>
  );
};

export default App;
