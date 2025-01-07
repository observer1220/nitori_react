import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConnectWallet from "./components/ConnectWallet";
import PrizePoolPage from "./page/PrizePoolPage";
import FixedBottomNavigation from "./components/BottomNavigation";
import SharePage from "./page/SharePage";
import InvestmentPage from "./page/InvestmentPage";
import BuyTicketsPage from "./page/BuyTicketsPage";
import DeveloperPage from "./page/DeveloperPage";

function App() {
  return (
    <>
      <ConnectWallet />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrizePoolPage />} />
          <Route path="/buy" element={<BuyTicketsPage />} />
          <Route path="/invest" element={<InvestmentPage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/developer" element={<DeveloperPage />} />
        </Routes>
        <FixedBottomNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
