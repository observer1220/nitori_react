import { useState } from "react";
import styled from "styled-components";
import { Button, Stack, TextField } from "@mui/material";
import LotteryDrawsButton from "../components/LotteryDrawsButton";
import { BuyLotteryTicketsABI } from "../abi/abiFunctions";
import { ToastContainer } from "react-toastify";

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px; */
  color: black;
`;

const BuyTicketsPage = () => {
  // 查詢 URL 是否有 ref參數
  const currentUrl = new URL(window.location.href);
  const urlSuffix = currentUrl.searchParams.get("ref") || "";

  const [lotCount, setLotCount] = useState(1);
  const [mul, setMul] = useState(1);
  const [luckyNumber, setLuckyNumber] = useState(0);
  const [ref, setRef] = useState(urlSuffix);
  const [cost, setCost] = useState(0.02);

  return (
    <>
      <Container>
        <h3>購買彩券</h3>
        <Stack
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1 } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="lotCount"
            label="彩券注數（1~1000）"
            value={lotCount}
            required
            type="number"
            fullWidth
            onChange={(event) => {
              if (Number(event.target.value) < 1) {
                setLotCount(1);
                return;
              } else if (Number(event.target.value) > 1000) {
                setLotCount(1000);
                return;
              }
              setLotCount(Number(event.target.value));
              setCost(0.02 * Number(event.target.value) * mul);
            }}
          />
          <TextField
            id="mul"
            label="倍數（1~100）"
            value={mul}
            required
            type="number"
            fullWidth
            onChange={(event) => {
              if (Number(event.target.value) < 1) {
                setMul(1);
                return;
              } else if (Number(event.target.value) > 100) {
                setMul(100);
                return;
              }
              setMul(Number(event.target.value));
              setCost(0.02 * lotCount * Number(event.target.value));
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              id="luckyNumber"
              label="幸運號碼"
              value={luckyNumber}
              type="number"
              fullWidth
              onChange={(event) => {
                if (Number(event.target.value) < 1) {
                  setLuckyNumber(1);
                  return;
                }
                setLuckyNumber(Number(event.target.value));
              }}
            />
            <Button
              variant="contained"
              onClick={() => setLuckyNumber(Math.floor(Math.random() * 100))}
            >
              隨機
            </Button>
          </div>
          <TextField
            id="ref"
            label="推薦碼"
            value={ref}
            onChange={(event) => setRef(event.target.value)}
            fullWidth
          />
          <TextField
            id="cost"
            label="下注金額"
            value={`${cost} tBNB`}
            disabled
            fullWidth
          />
        </Stack>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button
            variant="contained"
            onClick={() =>
              BuyLotteryTicketsABI(lotCount, mul, luckyNumber, ref)
            }
          >
            購買彩券
          </Button>
          <LotteryDrawsButton />
          {/* <Button variant="contained" onClick={() => GetLatestLotteryABI()}>
          最近彩券
        </Button> */}
        </Stack>
        {/* <div style={{ color: "black" }}>目前彩券：</div> */}
      </Container>
      <ToastContainer />
    </>
  );
};
export default BuyTicketsPage;
