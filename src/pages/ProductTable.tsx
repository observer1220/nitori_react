import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../api/products";
import { formatNumber } from "../utils/numbers";
import { fetchCategories } from "../api/category";
import { stock_status } from "../enum/enums";
import TableHeader from "../components/TableHeader";
import { ProductType } from "../interface";
import DialogComponent from "../components/DialogComponent";

const ProductTable: React.FC = () => {
  // 狀態管理
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<ProductType>>({});
  const [isEditing, setIsEditing] = useState(false);

  // 取得家具清單
  const productData = async () => {
    const data = await fetchProducts();
    setProductList(data);
  };

  // 取得分類清單
  const categoryData = async () => {
    const data = await fetchCategories();
    setCategoryList(data);
  };

  // 打開新增對話框
  const handleOpenDialog = () => {
    setCurrentItem({});
    setIsEditing(false);
    setOpen(true);
  };

  // 處理輸入變化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // 處理選擇變化
  const handleSelectChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: string; name: string } })
      | (Event & { target: { value: number; name: string } })
  ) => {
    const name = event.target.name as string;
    const value = event.target.value as string;

    setCurrentItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 編輯項目
  const handleEdit = (item: ProductType) => {
    setCurrentItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  // 刪除項目
  const handleDelete = (id: number) => {
    setProductList((prev) => prev.filter((item) => item.id !== id));
    deleteProduct(id);
  };

  useEffect(() => {
    productData();
    categoryData();
  }, [productList]);

  return (
    <>
      <TableHeader>
        <h3>產品管理</h3>
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
              <TableCell>原價</TableCell>
              <TableCell>折扣價</TableCell>
              <TableCell>庫存</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>分類</TableCell>
              <TableCell>功能</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatNumber(item.price)} 元</TableCell>
                <TableCell>{formatNumber(item.discount_price)} 元</TableCell>
                <TableCell>{formatNumber(item.stock)} 件</TableCell>
                <TableCell>
                  {stock_status[item.status as keyof typeof stock_status]}
                </TableCell>
                <TableCell>
                  {categoryList.find((c) => c.id === item.category_id)?.name}
                </TableCell>
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
        add={addProduct}
        edit={editProduct}
        children={
          <>
            <TextField
              margin="dense"
              name="name"
              label="家具名稱"
              fullWidth
              value={currentItem.name || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="原價"
              type="number"
              fullWidth
              value={currentItem.price || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="discount_price"
              label="折扣價"
              type="number"
              fullWidth
              value={currentItem.discount_price || ""}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="stock"
              label="庫存"
              type="number"
              fullWidth
              value={currentItem.stock || ""}
              onChange={handleInputChange}
            />
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>狀態</InputLabel>
              <Select
                name="status"
                label="狀態"
                value={currentItem.status || ""}
                onChange={(event) => handleSelectChange(event)}
                fullWidth
              >
                {stock_status &&
                  Object.keys(stock_status)?.map((key) => (
                    <MenuItem key={key} value={key}>
                      {stock_status[key as keyof typeof stock_status]}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>分類</InputLabel>
              <Select
                name="category_id"
                label="分類"
                value={currentItem.category_id || 0}
                onChange={(event) => handleSelectChange(event)}
              >
                {categoryList?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        }
      />
    </>
  );
};

export default ProductTable;
