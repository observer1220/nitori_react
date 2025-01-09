import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useNavigate } from "react-router-dom";

const useRefQuery = () => {
  const currentUrl = new URL(window.location.href);
  const ref = currentUrl.searchParams.get("ref");
  return ref ? `?ref=${ref}` : "";
};

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const urlRef = useRefQuery();

  const handleNavigation = (newValue: number) => {
    setValue(newValue);

    // 定義路徑對應表
    const paths = ["/", "/buy", "/invest", "/share"];
    const targetPath = paths[newValue] || "/";

    // 跳轉頁面，保留推薦碼
    navigate(`${targetPath}${urlRef}`);
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            console.log(event);
            handleNavigation(newValue);
          }}
        >
          <BottomNavigationAction label="獎金池" icon={<EmojiEventsIcon />} />
          <BottomNavigationAction label="購買彩券" icon={<BookOnlineIcon />} />
          <BottomNavigationAction label="投資" icon={<AttachMoneyIcon />} />
          <BottomNavigationAction label="分享" icon={<IosShareIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
