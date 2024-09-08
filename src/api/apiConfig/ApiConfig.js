// const appUrl = "http://localhost:4003";
const appUrl = "https://backend.cvtrade.io";
// const appUrl = "http://192.168.1.19:4003";

export const ApiConfig = {
  // =========EndPoints==========
  login: "login",
  newPassword: "newPassword",
  getdata: "pending-kyc-user",
  cpbalancebycoin: "cpbalancebycoin",
  getverifyData: "approve-kyc-user",
  getrejectedData: "rejected-kyc-user",
  getkycData: "kyc-details",
  verifyIdentity: "update-kyc-status",
  rejectIdentity: "verify-kyc",
  getusers: "getUsers",
  getTotaluser: "user-count",
  getVerified: "approved-kyc-count",
  getPending: "pending-kyc-count",
  getSupport: "support",
  getwithdrawal: "withdrawlrequest",
  getregistration: "counnewreg",
  allkyc: "kyc-details",
  coinlist: "coinList",
  currencyPair: "allsinglecoinlist",
  getSubAdminList: "sub-admin-list",
  getPartnersList: "getpartnerships",
  getCoinListDetails: "getcoinListedDetails ",
  AddsubAdmin: "add-new-admin",
  AddTrade: "addnewtrader",
  subadmindelete: "delete_subadmin",
  getallorder: "getOrders",
  addNotify: "add_notification",
  deleteNotify: "delete-notification",
  notificationList: "notification-list",
  helplist: "getallhelplist",
  todayNewRegistrations: "today_new_registration",
  createCategory: "create-coin-category",
  SubadminStatus: "admin_status",
  PartnersStatus: "setStatusPartnership",
  OpenOrderStatus: "delete-single-open-order",
  CoinDetailsStatus: "setcoindetailstatus ",
  updateSubadmin: "edit_subadmin",
  tradeStatus: "kycsetstatus",
  getInrWithrawList: "withdraw_request",
  userreqapprove: "confirmInrWithdraw",
  userreqreject: "rejectInrWithdraw",
  addAdTicket: "addAdTicket",
  ticketList: "ticketlist",
  adminsupport: "adminsupport",
  sendmailtouser: "sendmailtouser",
  documentchange: "documentchange",
  transferhistory: "user-trade-history",
  userWallet: "user-wallet",
  admintransfer: "admintransfer",
  depositrequest: "depositrequest",
  withdrawlrequest: "withdrawlrequest",
  totaldepositrequest: "depositrequest",
  totalwithdrawlrequest: "getWithdrawlReq",
  getmasterbal: "getmasterbal",
  changeseen: "changeseen",
  currencyCoinList: "get-coin",
  walletCoinList: "adminwallet",
  setcoinwithdrawal: "edit-currency",
  getcpaccountinfo: "getcpaccountinfo",
  getcpcoinbalance: "getcpcoinbalance",
  AddCoinPair: "add-pairs",
  AddPairFee: "updatecoinfee",
  getCurrencyPairList: "get-pairs",
  tredingReport: "trading-commission",
  sendFundStatus: "transactionstatus",
  completeWithdrawalRequest: "complete_withdrawal_request",
  PendingWithdrwal: "pending_withdrawal_request",
  CancelledWithdrwal: "reject_withdrawal_request",
  completeDepositRequest: "complete_deposit_request",
  completePendingRequest: "pending_deposit_request",
  inrdepositreq: "deposit_request",
  // confirmInrDeposit: "update_deposit_status",
  // rejectInrDeposit: "update_deposit_status",
  getUserWalletList: "select_given_coin",
  userWalletTransfer: "withdrawalcoin",
  // setrewardrate: "kyc/setrewardrate",
  // updatetdsrate: "updatetdsrate",
  updatemailTamplate: "updatemailTamplate",
  tradersList: "user-list",
  pendingtrader: "pendingtrader",
  fiatwithreq: "fiatwithreq",
  verifiedtrader: "verifiedtrader",
  fiatdepreq: "fiatdepreq",
  addNewCoins: "add-coin",
  getMasterWalletList: "adminwallettransactions",
  admincoinaddress: "admincoinaddress",
  getreceive: "getreceive",
  stakingList: "stacking/getAllUserstacking",
  transactionstatus: "update_withdrawal_status",
  Addbanner: "add_banner",
  bannerList: "banner_list",
  updateBanner: "update_banner",
  bannerdelete: "delete-banner/",
  BannerStatus: "set_banner_status",
  deleteCoinPair: "delete-pair",
  walletStatus: "withdrawstatus",
  getOtp: "auth/getcode",
  walletTransfer: "/transfertoother",
  addBankAcc: "add_bank_details",
  getAccDetails: "get_user_bank_details",
  fundsTransfer: "debit_credit",
  getCoinList: "get-coin",
  CoinCategory: "coin-category-list",
  tradingCommission: "trading-commission",
  tradeHistory: 'trade-history',
  OrderBook: 'orderbook',
  OpenOrders: 'all-open-orders',
  updateStatus: 'update_status',
  tradeById: 'find-trades-by-orderid',
  miscellaneousRequest: 'miscellaneous_withdrawal_request',
  MasterAccount: 'master-account',
  botStatus: 'bot-status',
  cancelOrder: 'cancel-order',
  verifyBankDetails: "verify-bank-details",
  pendingBankDetails: "pending-bank-details",
  approveBankDetails: "approve-bank-details",
  rejectBankDetails: "reject-bank-details",
  getLoginOtp: "send-otp",
  getMyLogs: "get_logs",
  user_walletdd: "all-user-wallet-backup",
  fund_transfer: "fund-transfer",
  updateTicketStatus: "update-ticket-status",
  getAllTickets: 'get-all-tickets',
  replyTicket: "reply-ticket",
  orderDetails: 'order_details',
  orderDispute: 'dispute_handling',
  p2pCoinList: "p2p_coin_list",
  fiatCurrencyList: "fiat_currency_list",
  all_p2p_orders: "all_p2p_orders",
  add_fiat: "add_fiat",
  remove_currency: "remove_currency",
  pendingUPIDetails: "pending-upi-details",
  approveUPIDetails: "approve-upi-details",
  rejectUPIDetails: "reject-upi-details",
  verifyUPIDetails: "verify-upi-details",
  statusToSettle: "statusToSettle",

  // ============URLs================
  baseHelp: `${appUrl}/help/`,
  baseTran: `${appUrl}/v1/transaction/`,
  baseUrl: `${appUrl}/v1/admin/`,
  uploadUrl: `${appUrl}/uploads/`,
  basenotify: `${appUrl}/acc/`,
  baseSecure: `${appUrl}/v1/coin/`,
  baseWallet: `${appUrl}/v1/wallet/`,
  baseCoin: `${appUrl}/v1/coin/`,
  baseReport: `${appUrl}/report/`,
  baseExchange: `${appUrl}/v1/exchange/`,
  baseAdmin: `${appUrl}/v1/admin/`,
  baseUser: `${appUrl}/v1/user/`,
  baseSupport: `${appUrl}/v1/support/`,
  baseP2P: `${appUrl}/v1/p2p/`,
  uploadcurrency: `${appUrl}/`,
  appUrl: `${appUrl}/`,
};