import { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import TableHeader from "../components/TableHeader";
import { CategoryType } from "../interface";
import DialogComponent from "../components/DialogComponent";
import {
  fetchCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "../api/category";

const CategoryTable = () => {
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<CategoryType>>({});

  const productData = async () => {
    const data = await fetchCategories();
    setCategoryList(data);
  };

  // 打開新增對話框
  const handleOpenDialog = () => {
    setCurrentItem({});
    setIsEditing(false);
    setOpen(true);
  };

  // 編輯項目
  const handleEdit = (item: CategoryType) => {
    setCurrentItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  // 刪除項目
  const handleDelete = (id: number) => {
    setCategoryList((prev) => prev.filter((item) => item.id !== id));
    deleteCategory(id);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    productData();
  }, [categoryList]);

  return (
    <>
      <TableHeader>
        <h3>分類列表</h3>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          sx={{ mb: 2 }}
        >
          新增
        </Button>
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
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(item)}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(item.id)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DialogComponent
        open={open}
        setOpen={setOpen}
        currentItem={currentItem}
        isEditing={isEditing}
        add={addCategory}
        edit={editCategory}
        children={
          <TextField
            margin="dense"
            name="name"
            label="名稱"
            fullWidth
            value={currentItem.name || ""}
            onChange={handleInputChange}
          />
        }
      />
    </>
  );
};

export default CategoryTable;
