import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <IconButton color="secondary" onClick={onClick} size="small">
      <Delete />
    </IconButton>
  );
};

export default DeleteButton;
