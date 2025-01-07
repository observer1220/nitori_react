import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  GetInvestmentBalanceABI,
  investorsProfitABI,
  RecentDividendTimeABI,
  totalInvestmentAmountABI,
} from "../abi/abiFunctions";
import { formatBNB } from "../utils/numbers";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  color: black;
`;

const InvestorRights = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

export default function InvestmentPage() {
  const [totalInvestmentAmount, setTotalInvestmentAmount] = useState();
  const [investBalance, setInvestBalance] = useState();
  const [investorsProfit, setInvestorsProfit] = useState(0);
  const [recentDividendTime, setRecentDividendTime] = useState("");

  useEffect(() => {
    const getInvestmentBalance = async () => {
      const tmp = await GetInvestmentBalanceABI();
      setInvestBalance(tmp);
    };

    const getRecentDividendTimeABI = async () => {
      const tmp = await RecentDividendTimeABI();
      const date = new Date(tmp * 1000);
      const tstring =
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日 " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();

      setRecentDividendTime(tstring);
    };

    const getTotalInvestmentAmount = async () => {
      // 這裡實作總投資金額的邏輯
      const tmp = await totalInvestmentAmountABI();
      // console.log(tmp);
      setTotalInvestmentAmount(tmp);
    };

    const getInvestorsProfit = async () => {
      const tmp = await investorsProfitABI();
      // console.log("investorsProfitABI", tmp);
      setInvestorsProfit(formatBNB(tmp));
    };

    getInvestmentBalance();
    getRecentDividendTimeABI();
    getTotalInvestmentAmount();
    getInvestorsProfit();
  }, []);

  return (
    <Container>
      <h3>總投資額：{totalInvestmentAmount} tBNB</h3>
      <div>總投資收益：{investorsProfit} tBNB</div>
      <div>我的投資：{investBalance} tBNB</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <TextField
          id="investAmount"
          label="投資金額"
          value=""
          size="small"
          placeholder="Invest amount should between 1 to 1000 BNB"
        />
        <Button variant="contained">投資</Button>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <TextField id="withdrawAmount" label="取款金額" value="" size="small" />
        <Button variant="contained">取款</Button>
      </div>
      <div>近期分紅時間：{recentDividendTime}</div>
      <Button variant="contained">領取分紅</Button>
      <h3>投資者權益</h3>
      <InvestorRights>
        <li>1. 所有彩券購買金額的 3% 利潤</li>
        <li>2. 所有彩券中獎金額的 5% 利潤</li>
        <li>3. 獎金池超過 10,000 tBNB，則獲得額外 0.5% 獎勵</li>
      </InvestorRights>
    </Container>
  );
}
