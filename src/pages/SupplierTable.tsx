import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import TableHeader from "../components/TableHeader";
import { CreateButton, DeleteButton, EditButton } from "../components/Buttons";
import DialogComponent from "../components/DialogComponent";
import { CategoryType } from "../interface";
import { handleInputChange } from "../utils/formHandlers";
import {
  fetchSuppliers,
  addSupplier,
  editSupplier,
  deleteSupplier,
} from "../api/supplier";

const SupplierTable = () => {
  const [supplierList, setSuppliers] = useState<CategoryType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<CategoryType>>({});

  const fetchData = async () => {
    const suppliers = await fetchSuppliers();
    console.log(suppliers);

    setSuppliers(suppliers);
  };

  const handleOpenDialog = () => {
    setCurrentItem({});
    setIsEditing(false);
    setOpen(true);
  };

  const handleEdit = (item: CategoryType) => {
    setCurrentItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setSuppliers((prev) => prev.filter((item) => item.id !== id));
    deleteSupplier(id);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // console.log("item", item);
    if (!isEditing) {
      addSupplier(currentItem);
    } else {
      editSupplier(currentItem.id, currentItem);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TableHeader>
        <h3>供應商列表</h3>
        <CreateButton onClick={handleOpenDialog} />
      </TableHeader>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>名稱</TableCell>
              <TableCell>功能</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supplierList?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <EditButton onClick={() => handleEdit(item)} />
                  <DeleteButton onClick={() => handleDelete(item.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogComponent
        open={open}
        onClose={handleCloseDialog}
        currentItem={currentItem}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        children={
          <TextField
            margin="dense"
            name="name"
            label="名稱"
            fullWidth
            value={currentItem.name || ""}
            onChange={(e) => handleInputChange(e, setCurrentItem)}
          />
        }
      />
    </>
  );
};

export default SupplierTable;
