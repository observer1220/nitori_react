import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface DialogComponentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentItem: any;
  isEditing: boolean;
  add: (item: any) => void;
  edit: (id: number, item: any) => void;
  children: React.ReactNode;
}

const DialogComponent = ({
  open,
  setOpen,
  currentItem,
  isEditing,
  add,
  edit,
  children,
}: DialogComponentProps) => {
  const handleSubmit = () => {
    console.log("currentItem", currentItem);

    if (isEditing) {
      edit(currentItem.id, currentItem);
    } else {
      add(currentItem);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>{isEditing ? "編輯" : "新增"}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          確認
        </Button>
        <Button onClick={handleCloseDialog} color="primary">
          取消
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
