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
import { EmployeeType } from "../interface";
import { handleInputChange } from "../utils/formHandlers";
import {
  fetchEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "../api/employee";

const EmployeeTable = () => {
  const [employeeList, setEmployee] = useState<EmployeeType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<EmployeeType>>({});

  const fetchData = async () => {
    const suppliers = await fetchEmployees();
    setEmployee(suppliers);
  };

  const handleOpenDialog = () => {
    setCurrentItem({});
    setIsEditing(false);
    setOpen(true);
  };

  const handleEdit = (item: EmployeeType) => {
    setCurrentItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    setEmployee((prev) => prev.filter((item) => item.id !== id));
    await deleteEmployee(id);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!isEditing) {
      await addEmployee(currentItem);
    } else {
      await editEmployee(currentItem.id, currentItem);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <TableHeader>
        <h3>員工管理</h3>
        <CreateButton onClick={handleOpenDialog} />
      </TableHeader>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>員工名稱</TableCell>
              <TableCell>職等</TableCell>
              <TableCell>工廠</TableCell>
              <TableCell>功能</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.warehouse_id}</TableCell>
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
              name="name"
              label="名稱"
              fullWidth
              value={currentItem.name || ""}
              onChange={(e) => handleInputChange(e, setCurrentItem)}
            />
            <TextField
              margin="dense"
              name="position"
              label="職等"
              fullWidth
              value={currentItem.position || ""}
              onChange={(e) => handleInputChange(e, setCurrentItem)}
            />
            <TextField
              margin="dense"
              name="warehouse_id"
              label="工廠"
              fullWidth
              value={currentItem.warehouse_id || ""}
              onChange={(e) => handleInputChange(e, setCurrentItem)}
            />
          </>
        }
      />
    </>
  );
};

export default EmployeeTable;
