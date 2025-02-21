import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import DialogComponent from "./DialogComponent";
import { useState } from "react";
import { handleInputChange } from "../utils/formHandlers";
import { LoginType } from "../interface";
import { changePassword } from "../api/login";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  color: #333;
`;

const ToolBar = () => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<LoginType>>({});
  const [isEditing, setIsEditing] = useState(false);
  const adminId = localStorage.getItem("id");
  const adminName = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log("currentItem", currentItem);
    await changePassword(Number(adminId), String(currentItem.passwd));
    handleLogout();
  };

  const handleEdit = () => {
    setCurrentItem({ name: adminName, passwd: "" });
    setIsEditing(true);
    setOpen(true);
  };

  return (
    <>
      <Container>
        <span>Hello, {adminName}</span>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit()}
          >
            修改密碼
          </Button>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            登出
          </Button>
        </div>
      </Container>

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
              value={currentItem.name}
              disabled
            />
            <TextField
              margin="dense"
              name="passwd"
              label="密碼"
              fullWidth
              value={currentItem.passwd || ""}
              onChange={(e) => handleInputChange(e, setCurrentItem)}
            />
          </>
        }
      />
    </>
  );
};

export default ToolBar;
