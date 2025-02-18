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
import { WarehousesType } from "../interface";
import { handleInputChange } from "../utils/formHandlers";
import {
  fetchWarehouses,
  addWarehouse,
  editWarehouse,
  deleteWarehouse,
} from "../api/warehouse";

const WarehouseTable = () => {
  const [warehouseList, setWarehouse] = useState<WarehousesType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<WarehousesType>>({});

  const fetchData = async () => {
    const warehouses = await fetchWarehouses();
    setWarehouse(warehouses);
  };

  const handleOpenDialog = () => {
    setCurrentItem({});
    setIsEditing(false);
    setOpen(true);
  };

  const handleEdit = (item: WarehousesType) => {
    setCurrentItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    setWarehouse((prev) => prev.filter((item) => item.id !== id));
    await deleteWarehouse(id);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!isEditing) {
      await addWarehouse(currentItem);
    } else {
      await editWarehouse(currentItem.id, currentItem);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TableHeader>
        <h3>倉庫管理</h3>
        <CreateButton onClick={handleOpenDialog} />
      </TableHeader>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>地點</TableCell>
              <TableCell>容量</TableCell>
              <TableCell>功能</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouseList?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.capacity}坪</TableCell>
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
          <>
            <TextField
              margin="dense"
              name="location"
              label="地點"
              fullWidth
              value={currentItem.location || ""}
              onChange={(e) => handleInputChange(e, setCurrentItem)}
            />
            <TextField
              margin="dense"
              name="capacity"
              label="容量"
              fullWidth
              value={currentItem.capacity || ""}
              onChange={(e) => handleInputChange(e, setCurrentItem)}
            />
          </>
        }
      />
    </>
  );
};

export default WarehouseTable;
