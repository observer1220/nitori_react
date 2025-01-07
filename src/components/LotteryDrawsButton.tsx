import Button from "@mui/material/Button";
import { LotteryDrawsABI } from "../abi/abiFunctions";

const LotteryDrawsButton = () => {
  return (
    <Button variant="contained" onClick={LotteryDrawsABI}>
      立即開獎
    </Button>
  );
};

export default LotteryDrawsButton;
