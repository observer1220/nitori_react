import { Button, TextField, Box, Typography } from "@mui/material";
import { handleInputChange } from "../utils/formHandlers";
import { useState } from "react";
import { LoginType } from "../interface";
import styled from "styled-components";
import { login } from "../api/login";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const FormContainer = styled(Box)`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  padding: 12px 0;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

const LoginPage = () => {
  const [currentItem, setCurrentItem] = useState<Partial<LoginType>>({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log(currentItem);
    if (!currentItem.name || !currentItem.passwd) {
      alert("請輸入帳號密碼");
      return;
    } else {
      const response = await login(currentItem.name, currentItem.passwd);
      console.log(response);

      if (response) {
        localStorage.setItem("id", response.id);
        localStorage.setItem("name", response.name);
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      } else {
        alert("帳號或密碼錯誤");
      }
    }
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#333",
            fontWeight: 700,
            mb: 4,
          }}
        >
          家具系統登入
        </Typography>

        <TextField
          margin="normal"
          name="name"
          label="帳號"
          fullWidth
          variant="outlined"
          value={currentItem.name || "observer1220@gmail.com"}
          onChange={(e) => handleInputChange(e, setCurrentItem)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
          }}
        />

        <TextField
          margin="normal"
          name="passwd"
          label="密碼"
          type="password"
          fullWidth
          variant="outlined"
          value={currentItem.passwd || "test1234"}
          onChange={(e) => handleInputChange(e, setCurrentItem)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
          }}
        />

        <StyledButton
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          fullWidth
          sx={{
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            color: "white",
            textTransform: "none",
          }}
        >
          確認登入
        </StyledButton>
      </FormContainer>
    </LoginContainer>
  );
};

export default LoginPage;
