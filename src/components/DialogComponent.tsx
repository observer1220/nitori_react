import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// inspect the parameters of the component
interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  currentItem: any;
  isEditing: boolean;
  onSubmit: (item: any) => void;
  children: React.ReactNode;
}

const DialogComponent = ({
  open,
  onClose,
  currentItem,
  isEditing,
  onSubmit,
  children,
}: DialogComponentProps) => {
  const handleSubmit = () => {
    onSubmit(currentItem);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{!isEditing ? "新增" : "編輯"}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          確認
        </Button>
        <Button onClick={onClose} color="primary">
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
