import { ethers } from "ethers";
import { LotteryGameABI } from "../abi/LotteryGameABI";
import toast from "react-hot-toast";

const ethereum = (window as any).ethereum;

// 合約地址與 ABI
const contractAddress = "0x5DC1adC25DBAfa8E5aFeE2D32b69FA5748dbbb63";
const contractABI = LotteryGameABI;

// 初始化合約(會消耗Gas fee)
const initializeContractWithSigner = async () => {
  if (!ethereum) {
    alert("請安裝 MetaMask");
    return null;
  }

  await ethereum.request({ method: "eth_requestAccounts" });

  // 取得提供者並建立 signer
  const browserProvider = new ethers.BrowserProvider(ethereum);
  const signer = await browserProvider.getSigner();
  console.log("signer", signer);

  // 使用 signer 初始化合約
  return new ethers.Contract(contractAddress, contractABI, signer);
};

// 初始化合約(不會消耗Gas fee)
const initializeContractWithProvider = async () => {
  // 設定 Provider（連接到幣安測試網）
  const providerUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
  const provider = new ethers.JsonRpcProvider(providerUrl);

  return new ethers.Contract(contractAddress, contractABI, provider);
};

// 購買彩券功能
const BuyLotteryTicketsABI = async (
  lotCount: number,
  mul: number,
  luckyNumber: number,
  ref: string
) => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const tx = await contract.BuyLotteryTickets(
      lotCount,
      mul,
      luckyNumber,
      ref || ethers.ZeroAddress, // 如果沒有推薦碼，設置地址為 0x00...
      {
        value: ethers.parseEther("0.02") * BigInt(lotCount), // 替換為實際所需的ETH金額
      }
    );

    const receipt = await tx.wait(); // 等待交易完成
    console.log("交易成功", receipt);
  } catch (error) {
    console.log("BuyLotteryTicketsABI", error);
    alert("BuyLotteryTicketsABI");
  }
};

// 抽獎功能
const LotteryDrawsABI = async () => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const result = await contract.LotteryDraws();
    // console.log("LotteryDrawsABI", result);
    return result;
  } catch (error) {
    alert("You don't have undraw lottery tickets");
  }
};

// 查詢開發者地址
const GetDevAddressABI = async () => {
  try {
    const contract = await initializeContractWithProvider();
    const result = await contract.devAddress();
    console.log("GetDevAddressABI", result.toString());
    // return result.toString();
  } catch (error) {
    console.log("GetDevAddressABI", error);
    alert("GetDevAddressABI");
  }
};

// 查詢投資餘額
const GetInvestmentBalanceABI = async () => {
  try {
    const getWalletAddress = sessionStorage.getItem("walletAddress");
    const contract = await initializeContractWithProvider();
    const result = await contract.GetInvestmentBalance(getWalletAddress);
    // console.log("GetInvestmentBalanceABI", result.toString());
    return result.toString();
  } catch (error) {
    console.log("GetInvestmentBalanceABI", error);
    alert("GetInvestmentBalanceABI");
  }
};

// 下次分紅時間
const RecentDividendTimeABI = async () => {
  try {
    const contract = await initializeContractWithProvider();
    const result = await contract.recentDividendTime();
    // console.log("RecentDividendTimeABI", result);
    return result.toString();
  } catch (error) {
    console.log("GetInvestmentBalanceABI", error);
    alert("GetNextDividendTimeABI");
  }
};

// 總投資金額
const totalInvestmentAmountABI = async () => {
  try {
    const contract = await initializeContractWithProvider();
    const result = await contract.totalInvestmentAmount();
    return result.toString();
  } catch (error) {
    console.log("totalInvestmentAmount", error);
    alert("totalInvestmentAmount");
  }
};

// 投資者收益
const investorsProfitABI = async () => {
  try {
    const contract = await initializeContractWithProvider();
    const result = await contract.investorsProfit();
    return result.toString();
  } catch (error) {
    console.log("investorsProfit", error);
    alert("investorsProfit");
  }
};

// 查詢自己最近的開獎紀錄
const GetLatestLotteryABI = async () => {
  try {
    const contract = await initializeContractWithProvider();
    const result = await contract.GetLatestLottery();
    console.log("GetLatestLottery", result);
    return result;
  } catch (error) {
    console.log("GetLatestLottery", error);
    alert("GetLatestLottery");
  }
};

// 查詢中獎紀錄
const GetWinningRecordABI = async () => {
  try {
    const contract = await initializeContractWithProvider();
    const result = await contract.GetWinningRecord();
    console.log("GetWinningRecord", result);
    return result;
  } catch (error) {
    console.log("GetWinningRecord", error);
    alert("GetWinningRecord");
  }
};

// 投資存入(最低為1BNB)
const InvesmentDepositABI = async (amount: number) => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const tx = await contract.InvestmentDeposit({
      value: ethers.parseEther(amount.toString()),
    });

    const receipt = await tx.wait();
    console.log("InvesmentDepositABI", receipt);
  } catch (error) {
    console.log("InvesmentDepositABI", error);
    alert("InvesmentDepositABI");
  }
};

// 投資提款
const InvestmentWithdrawalABI = async (withdrawalAmount: number) => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const tx = await contract.InvestmentWithdrawal(
      ethers.parseEther(withdrawalAmount.toString())
    );

    const receipt = await tx.wait();
    console.log("InvestmentWithdrawalABI", receipt);
  } catch (error) {
    console.log("InvestmentWithdrawalABI", error);
    alert("InvestmentWithdrawalABI");
  }
};

// 投資分紅
const InvestmentDividendsABI = async () => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const tx = await contract.InvestmentDividends();

    const receipt = await tx.wait();
    console.log("InvestmentDividendsABI", receipt);
  } catch (error) {
    console.log("InvestmentDividendsABI", error);
    alert("InvestmentDividendsABI");
  }
};

// 開發者提取利潤
const WithDrawDeveloperProfitABI = async () => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const tx = await contract.WithDrawDeveloperProfit();

    const receipt = await tx.wait();
    console.log("WithDrawDeveloperProfitABI", receipt);
  } catch (error) {
    console.log("WithDrawDeveloperProfitABI", error);
    alert("WithDrawDeveloperProfitABI");
  }
};

// 推薦人提取利潤
const WithDrawReferralProfitABI = async () => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const tx = await contract.WithDrawReferralProfit();

    const receipt = await tx.wait();
    console.log("WithDrawReferralProfitABI", receipt);
  } catch (error) {
    // alert("WithDrawReferralProfitABI", error);
    toast.error("推薦獎勵需大於 0.01 BNB 才可領取");
  }
};

export {
  // Read Contract 7
  GetInvestmentBalanceABI,
  GetDevAddressABI,
  RecentDividendTimeABI,
  GetLatestLotteryABI,
  GetWinningRecordABI,
  investorsProfitABI,
  totalInvestmentAmountABI,
  // Write Contract 8
  BuyLotteryTicketsABI,
  LotteryDrawsABI,
  InvesmentDepositABI,
  InvestmentWithdrawalABI,
  InvestmentDividendsABI,
  WithDrawDeveloperProfitABI,
  WithDrawReferralProfitABI,
  // DestructContract
};
