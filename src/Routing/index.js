import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loginpage from "../ui/pages/LoginPage";
import ForgetpasswordPage from "../ui/pages/ForgetpasswordPage";
import DashboardPage from "../ui/pages/DashboardPage";
import HomePage from "../ui/pages/HomePage";
import AddsubAdmin from "../ui/pages/AddsubAdmin";
import SubadminList from "../ui/pages/SubadminList";
import ApprovedKyc from "../ui/pages/ApprovedKyc";
import PendingKyc from "../ui/pages/PendingKyc";
import TradeList from "../ui/pages/TradeList";
import CurrencyManagement from "../ui/pages/CurrencyManagement";
import CurrencypairManagement from "../ui/pages/CurrencypairManagement";
import TradingReport from "../ui/pages/TradingReport";
import FundsManagement from "../ui/pages/FundsCompletedWithdrawal";
import FundsCancelledWithdrawal from "../ui/pages/FundsCancelledWithdrawal";
import FundsPendingWithdrawal from "../ui/pages/FundsPendingWithdrawal";
import FundsDManagement from "../ui/pages/FundsCompletedDeposit";
import WithdrawalFees from "../ui/pages/WithdrawalFees";
import MiscellaneousPage from "../ui/pages/MiscellaneousPage";
import Notification from "../ui/pages/Notification";
import ContentManager from "../ui/pages/ContentManager";
import BannerManagement from "../ui/pages/BannerManagement";
import RejectedKyc from "../ui/pages/RejectedKyc";
import TradingCommision from "../ui/pages/TradingCommision";
import OrderBook from "../ui/pages/OrderBook";
import FundsPendingDeposit from "../ui/pages/FundsPendingDeposit";
import Partnership from "../ui/pages/Partnership";
import CurrencyList from "../ui/pages/P2P/CurrencyList";
import PaymentOptions from "../ui/pages/P2P/PaymentOptions";
import SupportPage from "../ui/pages/SupportPage";
import History from "../ui/pages/P2P/History";
import { ToastContainer } from "react-toastify";
import CoinListDetails from "../ui/pages/CoinListDetails";
import BankDetailsManagement from "../ui/pages/BankDetailsMangement";
import TodayRegistration from "../ui/pages/TodayRegistration";
import ExchangeWalletManagement from "../ui/pages/ExchangeWalletManagement";
import MyActivityLogs from "../ui/pages/MyActivityLogs";
import AllOpenOrders from "../ui/pages/AllOpenOrders";
import CoinlistFee from "../ui/pages/CoinListingFee";
import P2PCommission from "../ui/pages/P2PCommission";
import UserWalletBal from "../ui/pages/UserWalletBal";
import UserBank from "../ui/pages/User Bank";
import UserUPI from "../ui/pages/User Upi";
import PartnershipWithdrawal from "../ui/pages/PartnerWithdrawal";
import PartnerStakePayout from "../ui/pages/PartnerStakePayout";
import PartnerComission from "../ui/pages/PartnerComission";
import AddPartner from "../ui/pages/AddPartner";

const Routing = () => {
    const [actived, setActived] = useState('')
    const token = sessionStorage.getItem('token');

    return (
        <Router>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover limit={1} theme="light" />
            <Routes>
                {token ?
                    <>
                        <Route exact path="/dashboard/*" element={<DashboardPage />} >
                            <Route index element={<HomePage />}></Route>
                            <Route exect path="homepage" element={<HomePage />}></Route>
                            <Route exect path="listsubadmin" element={<SubadminList />}></Route>
                            <Route exect path="addsubadmin" element={<AddsubAdmin />}></Route>
                            <Route exect path="tradelist" element={<TradeList />}></Route>
                            <Route exect path="pendingkyc" element={<PendingKyc />}></Route>
                            <Route exect path="approvedkyc" element={<ApprovedKyc />}></Route>
                            <Route exect path="currencymanagement" element={<CurrencyManagement />}></Route>
                            <Route exect path="currencypair" element={<CurrencypairManagement />}></Route>
                            <Route exect path="tradingfeereport" element={<TradingReport />}></Route>
                            <Route exect path="exchangeWalletManagement" element={<ExchangeWalletManagement />}></Route>
                            <Route exect path="fundsManagement" element={<FundsManagement />}></Route>
                            <Route exect path="FundsCancelledWithdrawal" element={<FundsCancelledWithdrawal />}></Route>
                            <Route exect path="FundsPendingWithdrawal" element={<FundsPendingWithdrawal />}></Route>
                            <Route exect path="fundsDManagement" element={<FundsDManagement />}></Route>
                            <Route exect path="WithdrawalFees" element={<WithdrawalFees />}></Route>
                            <Route exect path="MiscellaneousPage" element={<MiscellaneousPage />}></Route>
                            <Route exect path="notification" element={<Notification />}></Route>
                            <Route exect path="content" element={<ContentManager />}></Route>
                            <Route exect path="bannerManagement" element={<BannerManagement />}></Route>
                            <Route exect path="RejectedKyc" element={<RejectedKyc />}></Route>
                            <Route exect path="TradingCommision" element={<TradingCommision />}></Route>
                            <Route exect path="OrderBook" element={<OrderBook />}></Route>
                            <Route exect path="FundsPendingDeposit" element={<FundsPendingDeposit />}></Route>
                            <Route exect path="partnership" element={<Partnership />}></Route>
                            <Route exect path="coinListDetails" element={<CoinListDetails />}></Route>
                            <Route exect path="p2pCoinList" element={<CurrencyList />}></Route>
                            <Route exect path="p2pPaymentOptions" element={<PaymentOptions />}></Route>
                            <Route exect path="p2pHistory" element={<History />}></Route>
                            <Route exect path="support" element={<SupportPage />}></Route>
                            <Route exect path="bankDetailsManagement" element={<BankDetailsManagement />}></Route>
                            <Route exect path="todayRegistration" element={<TodayRegistration />}></Route>
                            <Route exect path="myLogs" element={<MyActivityLogs />}></Route>
                            <Route exect path="allOpenOrders" element={<AllOpenOrders />}></Route>
                            <Route exect path="CoinFee" element={<CoinlistFee />}></Route>
                            <Route exect path="P2pCommission" element={<P2PCommission />}></Route>
                            <Route exect path="UserBank" element={<UserBank />}></Route>
                            <Route exect path="UserUPI" element={<UserUPI />}></Route>
                            <Route exect path="user_wallet_balance" element={<UserWalletBal />}></Route>
                            <Route exect path="PartnershipWithdrawal" element={<PartnershipWithdrawal />}></Route>
                            <Route exect path="PartnerStakePayout" element={<PartnerStakePayout />}></Route>
                            <Route exect path="PartnerComission" element={<PartnerComission />}></Route>
                            <Route exect path="AddPartner" element={<AddPartner />}></Route>

                        </Route>

                    </> :
                    <Route path="/" element={<Loginpage />}></Route>

                }
                <Route path="/" element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />}></Route>
                <Route path="*" element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />}></Route>

                <Route exect path="/forgotpassword" element={<ForgetpasswordPage />}></Route>

            </Routes>
        </Router>
    );
}

export default Routing;