import { List, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>家具管理系統</h3>
      <List component="nav">
        <ListItemButton onClick={() => navigate("/")}>Dashboard</ListItemButton>
        <ListItemButton onClick={() => navigate("/products")}>
          產品管理
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/categories")}>
          類別管理
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/suppliers")}>
          供應商管理
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/warehouses")}>
          倉庫及庫存管理
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/orders")}>
          訂單管理
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/customers")}>
          顧客管理
        </ListItemButton>
        <ListItemButton onClick={() => navigate("/employees")}>
          員工管理
        </ListItemButton>
      </List>
    </div>
  );
};

export default SideBar;
