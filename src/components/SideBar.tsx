import { List, ListItemButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { pathList } from "../enum/enums";

const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigate = useNavigate();

  const handleListItemClick = (index: number, path: string) => {
    setSelectedIndex(index);
    navigate(path);
  };

  return (
    <div>
      <h3>家具管理系統</h3>
      <List component="nav">
        {pathList.map((item, idx) => (
          <ListItemButton
            selected={selectedIndex === idx}
            key={item.name}
            onClick={() => handleListItemClick(idx, item.path)}
          >
            {item.name}
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default SideBar;
