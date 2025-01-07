import { Button } from "@mui/material";
import { GetDevAddressABI } from "../abi/abiFunctions";

const DeveloperPage = () => {
  return (
    <>
      <Button variant="contained" onClick={GetDevAddressABI}>
        開發者地址
      </Button>
    </>
  );
};
export default DeveloperPage;
