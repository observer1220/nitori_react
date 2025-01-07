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

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNavigation = (newValue: any) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        break;
      case 1:
        navigate("/buy");
        break;
      case 2:
        navigate("/invest");
        break;
      case 3:
        navigate("/share");
        break;
      default:
        break;
    }
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
          onChange={(newValue) => {
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
