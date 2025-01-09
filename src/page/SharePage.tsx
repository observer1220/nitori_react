import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  GetReferralProfitABI,
  WithDrawReferralProfitABI,
} from "../abi/abiFunctions";
import { ToastContainer, toast } from "react-toastify";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: black;
`;

export default function SharePage() {
  const getWalletAddress = sessionStorage.getItem("walletAddress");
  const currentUrl = `${window.location.href}?ref=${getWalletAddress}`;
  const [referalProfit, setReferalProfit] = useState(0);

  const qrcode = (
    <QRCodeCanvas id="qrCode" value={currentUrl} size={200} level={"H"} />
  );

  // 複製URL
  const copyURL = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("已複製連結", {
      position: "top-center",
    });
  };

  useEffect(() => {
    const GetReferralProfit = async () => {
      const tmp = await GetReferralProfitABI();
      setReferalProfit(tmp);
    };
    GetReferralProfit();
  });

  return (
    <>
      <Container>
        {qrcode}
        分享連結永久獲得 4% 的投注金額
        <div style={{ display: "flex", gap: "5px" }}>
          <TextField
            id="shareLink"
            label="分享連結"
            value={currentUrl}
            disabled
            size="small"
            fullWidth
          />
          <Button variant="contained" onClick={copyURL}>
            複製
          </Button>
        </div>
        <div>我的推薦收益：{referalProfit} tBNB</div>
        <Button variant="contained" onClick={WithDrawReferralProfitABI}>
          領取推薦人收益
        </Button>
      </Container>
      <ToastContainer />
    </>
  );
}
