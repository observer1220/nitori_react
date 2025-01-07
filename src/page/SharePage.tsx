import { Button, TextField } from "@mui/material";
import styled from "styled-components";
import {} from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { WithDrawReferralProfitABI } from "../abi/abiFunctions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: black;
`;

export default function SharePage() {
  const url = window.location.href; // 取得目前的URL
  const [referalProfit, setReferalProfit] = useState(0);

  const qrcode = (
    <QRCodeCanvas id="qrCode" value={url} size={250} level={"H"} />
  );

  // 複製URL
  const copyURL = () => {
    navigator.clipboard.writeText(url);
  };

  useEffect(() => {
    // 待更新
    setReferalProfit(0.1);
  });

  return (
    <Container>
      {qrcode}
      分享連結永久獲得4%的投注金額
      <TextField
        id="shareLink"
        label="分享連結"
        value={url}
        disabled
        size="small"
      />
      <Button variant="contained" onClick={copyURL}>
        複製連結
      </Button>
      <div>我的推薦收益：{referalProfit} tBNB</div>
      <Button variant="contained" onClick={WithDrawReferralProfitABI}>
        領取推薦人收益
      </Button>
    </Container>
  );
}
