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
  const url = `${window.location.href}?ref=${getWalletAddress}`; // 取得目前的URL
  const [referalProfit, setReferalProfit] = useState(0);

  const qrcode = (
    <QRCodeCanvas id="qrCode" value={url} size={200} level={"H"} />
  );

  // 複製URL
  const copyURL = () => {
    navigator.clipboard.writeText(url);
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
        分享連結永久獲得4%的投注金額
        <TextField
          id="shareLink"
          label="分享連結"
          value={url}
          disabled
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={copyURL}>
          複製連結
        </Button>
        <div>我的推薦收益：{referalProfit} tBNB</div>
        <Button variant="contained" onClick={WithDrawReferralProfitABI}>
          領取推薦人收益
        </Button>
      </Container>
      <ToastContainer />
    </>
  );
}
