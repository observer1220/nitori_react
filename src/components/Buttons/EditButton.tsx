import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => (
  <IconButton color="primary" onClick={onClick} size="small">
    <Edit />
  </IconButton>
);

export default EditButton;
