import { ethers } from "ethers";
import { LotteryGameABI } from "../abi/LotteryGameABI";
import { toast } from "react-toastify";

const ethereum = (window as any).ethereum;
// 設定 Provider（連接到幣安測試網）
const providerUrl = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const provider = new ethers.JsonRpcProvider(providerUrl);

// 合約地址與 ABI
const contractAddress = "0x5DC1adC25DBAfa8E5aFeE2D32b69FA5748dbbb63";
const contractABI = LotteryGameABI;

// 初始化合約(會消耗Gas fee)
const initializeContractWithSigner = async () => {
  if (!ethereum) {
    toast.error("請安裝 MetaMask", {
      position: "top-center",
    });
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
        value: ethers.parseEther("0.02") * BigInt(lotCount) * BigInt(mul), // 替換為實際所需的ETH金額
      }
    );

    const receipt = await tx.wait(); // 等待交易完成
    console.log("交易成功", receipt);
  } catch (error) {
    // console.log("BuyLotteryTicketsABI", error);
    toast.error("取消購買", {
      position: "top-center",
    });
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
    toast.error("您沒有未抽獎的彩券", {
      position: "top-center",
    });
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
  }
};

// 投資存入(最低為1BNB)
const InvesmentDepositABI = async (amount: number) => {
  try {
    const contract = await initializeContractWithSigner();
    if (!contract) return;

    const tx = await contract.InvesmentDeposit({
      value: ethers.parseEther(amount.toString()),
    });

    const receipt = await tx.wait();
    console.log("InvesmentDepositABI", receipt);
  } catch (error) {
    // console.log("InvesmentDepositABI", error);
    toast.error("取消投資", {
      position: "top-center",
    });
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
    // console.log("InvestmentWithdrawalABI", error);
    toast.error("取款金額高於投資餘額", {
      position: "top-center",
    });
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
    toast.error("推薦獎勵需大於 0.01 BNB 才可領取", {
      position: "top-center",
    });
  }
};

// 查詢合約餘額
const ContractBalance = async () => {
  const contractBalance = await provider.getBalance(contractAddress);
  // console.log("Prize Pool Amount:", ethers.formatEther(contractBalance), "ETH");
  return ethers.formatEther(contractBalance);
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
  ContractBalance,
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
