import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "./api/products";

// 家具項目的型別定義
interface FurnitureItem {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  stock: number;
  category: string;
  status: boolean;
}

const FurnitureManagement: React.FC = () => {
  // 狀態管理
  const [open, setOpen] = useState(false);
  const [furnitureList, setFurnitureList] = useState<FurnitureItem[]>([]);
  const [currentItem, setCurrentItem] = useState<Partial<FurnitureItem>>({});
  const [isEditing, setIsEditing] = useState(false);

  // 取得家具清單
  const productData = async () => {
    const data = await fetchProducts();
    setFurnitureList(data);
  };

  // 打開新增對話框
  const handleOpenDialog = () => {
    setCurrentItem({});
    setIsEditing(false);
    setOpen(true);
  };

  // 關閉對話框
  const handleCloseDialog = () => {
    setOpen(false);
  };

  // 處理輸入變化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // 提交表單
  const handleSubmit = () => {
    if (isEditing) {
      // 編輯現有項目
      setFurnitureList((prev) =>
        prev.map((item) =>
          item.id === currentItem.id ? (currentItem as FurnitureItem) : item
        )
      );
      if (currentItem.id !== undefined) {
        editProduct(currentItem.id, currentItem);
      }
    } else {
      // 新增項目
      const newItem: FurnitureItem = {
        ...currentItem,
        id: Date.now(), // 簡單的唯一ID生成
        name: currentItem.name || "",
        price: currentItem.price || 0,
        discount_price: currentItem.discount_price || 0,
        stock: currentItem.stock || 0,
        category: currentItem.category || "",
        status: currentItem.status || true,
      } as FurnitureItem;
      setFurnitureList((prev) => [...prev, newItem]);
      addProduct(newItem);
    }
    handleCloseDialog();
  };

  // 編輯項目
  const handleEdit = (item: FurnitureItem) => {
    setCurrentItem(item);
    setIsEditing(true);
    setOpen(true);
  };

  // 刪除項目
  const handleDelete = (id: number) => {
    setFurnitureList((prev) => prev.filter((item) => item.id !== id));
    deleteProduct(id);
  };

  useEffect(() => {
    productData();
  }, []);

  return (
    <div>
      {/* 新增按鈕 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>家具庫存管理</h2>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          sx={{ mb: 2 }}
        >
          新增家具
        </Button>
      </div>

      {/* 家具庫存表格 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>家具名稱</TableCell>
              <TableCell>原價</TableCell>
              <TableCell>折扣價</TableCell>
              <TableCell>庫存</TableCell>
              <TableCell>分類</TableCell>
              <TableCell>狀態</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {furnitureList.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price} 元</TableCell>
                <TableCell>{item.discount_price} 元</TableCell>
                <TableCell>{item.stock} 件</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.status ? "販售中" : "暫停販售"}</TableCell>
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

      {/* 新增/編輯對話框 */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{isEditing ? "編輯家具" : "新增家具"}</DialogTitle>
        <DialogContent>
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
          <TextField
            margin="dense"
            name="category"
            label="分類"
            fullWidth
            value={currentItem.category || ""}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={
              <Switch
                name="status"
                checked={currentItem.status || false}
                onChange={(e) =>
                  setCurrentItem((prev) => ({
                    ...prev,
                    status: e.target.checked,
                  }))
                }
              />
            }
            label="狀態"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            確認
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            取消
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FurnitureManagement;
