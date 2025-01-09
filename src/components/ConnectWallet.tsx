import { useState } from "react";

const ConnectWallet = () => {
  const webUrl = window.location.href;
  const [walletAddress, setWalletAddress] = useState<string | null>(
    sessionStorage.getItem("walletAddress")
  );
  const ethereum = (window as any).ethereum;

  // Connect MetaMask
  const connectWallet = async () => {
    if (ethereum) {
      try {
        // Request account access
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);

        // Save wallet address to sessionStorage
        sessionStorage.setItem("walletAddress", accounts[0]);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      // alert("MetaMask is not installed. Please install it to use this app.");
      // Detect metamask app in mobile device and open it
      window.open(`https://metamask.app.link/dapp/${webUrl}`);
    }
  };

  return (
    // 固定在頁面右上角的連接錢包按鈕
    <div style={{ position: "fixed", top: 0, right: 0, padding: 10 }}>
      <button onClick={connectWallet}>
        {walletAddress
          ? `連結: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
          : "連結錢包"}
      </button>
    </div>
  );
};

export default ConnectWallet;
