import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

interface CreateButtonProps {
  onClick: () => void;
}

const CreateButton = ({ onClick }: CreateButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Add />}
      onClick={onClick}
      sx={{ mb: 2 }}
    >
      新增
    </Button>
  );
};

export default CreateButton;
