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
import { CategoryType } from "../interface";
import DialogComponent from "../components/DialogComponent";
import {
  fetchCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "../api/category";
import { CreateButton, EditButton, DeleteButton } from "../components/Buttons";
import { handleInputChange } from "../utils/formHandlers";

const CategoryTable = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<CategoryType>>({});

  const fetchData = async () => {
    const categories = await fetchCategories();
    setCategoryList(categories);
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

  const handleDelete = async (id: number) => {
    setCategoryList((prev) => prev.filter((item) => item.id !== id));
    await deleteCategory(id);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // console.log("item", item);
    if (!isEditing) {
      await addCategory(currentItem);
    } else {
      await editCategory(currentItem.id, currentItem);
    }
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TableHeader>
        <h3>分類列表</h3>
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
            {categoryList?.map((item) => (
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

export default CategoryTable;
