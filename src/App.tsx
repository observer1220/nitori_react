import { HashRouter, Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import "./App.css";
import FurnitureManagement from "./pages/FurnitureTable";
import SideBar from "./components/SideBar";
import CategoryTable from "./pages/CategoryTable";
import Dashboard from "./pages/Dashboard";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  height: 100vh;
`;

const MainContent = styled.div`
  overflow: auto; /* 確保內容區域可滾動 */
  min-width: 600px;
  padding: 20px;
`;

function App() {
  return (
    <HashRouter>
      <Layout>
        <SideBar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<FurnitureManagement />} />
            <Route path="/products" element={<FurnitureManagement />} />
            <Route path="/categories" element={<CategoryTable />} />
            <Route path="/suppliers" element={<>Suppliers</>} />
            <Route path="/warehouses" element={<>Warehouses</>} />
            <Route path="/orders" element={<>Orders</>} />
            <Route path="/customers" element={<>Customers</>} />
            <Route path="/employees" element={<>Employees</>} />
          </Routes>
        </MainContent>
      </Layout>
    </HashRouter>
  );
}

export default App;
