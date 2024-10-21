import { ApiConfig } from "../apiConfig/ApiConfig";
import { ApiCallDelete, ApiCallPost, ApiCallPut } from "../apiConfig/ApiCall";
import { ApiCallGet } from "../apiConfig/ApiCall";
const TAG = "AuthService";

const AuthService = {
  login: async (email, otp, password) => {
    const { baseUrl, login } = ApiConfig;
    const url = baseUrl + login;
    const params = {
      email_or_phone: email,
      verification_code: +otp,
      password: password,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  getOtp: async (email) => {
    const { baseUser, getLoginOtp } = ApiConfig;
    const url = baseUser + getLoginOtp;
    const params = {
      email_or_phone: email,
      resend: true
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  forgotPassword: async (email) => {
    const { baseSecure, newPassword } = ApiConfig;
    const url = baseSecure + newPassword;
    const params = {
      emailId: email,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  transferCoin: async (firstCoin) => {
    const token = sessionStorage.getItem("token");
    const { baseWallet, cpbalancebycoin } = ApiConfig;
    const url = baseWallet + cpbalancebycoin;

    const params = {
      coinName: firstCoin,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getdata: async (skip, limit) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getdata } = ApiConfig;
    const url = baseUrl + getdata
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  withdrawalFees: async (skip, limit) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, withdrawalFees } = ApiConfig;
    const url = baseUrl + withdrawalFees
    const params = {
      skip, limit
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getdataverifylist: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getverifyData } = ApiConfig;
    const url = baseUrl + getverifyData
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },
  getdatarejectedlist: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getrejectedData } = ApiConfig;
    const url = baseUrl + getrejectedData
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getkycdata: async (userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getkycData } = ApiConfig;
    const url = baseUrl + getkycData;
    const params = {
      userId: userId,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getverifyidentity: async (id, status, rejectReason) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, verifyIdentity } = ApiConfig;
    const url = baseUrl + verifyIdentity;
    const params = {
      userId: id,
      status: status,
      adminId: "",
      kyc_reject_reason: rejectReason,
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  getrejectIdentity: async (userId, rejectReason) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, rejectIdentity } = ApiConfig;
    const url = baseSecure + rejectIdentity;

    const params = {
      userId: userId,
      reason: rejectReason,
      status: "3",
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getBannerList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, bannerList } = ApiConfig;
    const url = baseUrl + bannerList;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getusers: async () => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, getusers } = ApiConfig;
    const url = baseSecure + getusers;

    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  pendingBankDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, pendingBankDetails } = ApiConfig;
    const url = baseAdmin + pendingBankDetails;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  approveBankDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, approveBankDetails } = ApiConfig;
    const url = baseAdmin + approveBankDetails;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  addCurrency: async (currency_short_name, type) => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, add_fiat } = ApiConfig;
    const url = baseAdmin + add_fiat;
    const params = { currency_short_name, type }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  remove_currency: async (currency_short_name, type) => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, remove_currency } = ApiConfig;
    const url = baseAdmin + remove_currency;
    const params = { currency_short_name, type }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  rejectBankDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, rejectBankDetails } = ApiConfig;
    const url = baseAdmin + rejectBankDetails;
    const params = {}
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },


  getTotaluser: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getTotaluser } = ApiConfig;
    const url = baseUrl + getTotaluser;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getTotalVerified: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getVerified } = ApiConfig;
    const url = baseUrl + getVerified;
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getTotalPending: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, getPending } = ApiConfig;
    const url = baseUrl + getPending;
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  getSupportUser: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getSupport } = ApiConfig;
    const url = baseSecure + getSupport;
    const params = {};
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getWithdrawal: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getwithdrawal } = ApiConfig;
    const url = baseSecure + getwithdrawal;
    const params = {};
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getNewRegistration: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getregistration } = ApiConfig;
    const url = baseSecure + getregistration;
    const params = {};
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  allKycData: async (userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, allkyc } = ApiConfig;
    const url = baseUrl + allkyc;
    const params = {
      userId: userId,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  coinlist: async () => {
    const { baseCoin, currencyCoinList } = ApiConfig;
    const url = baseCoin + currencyCoinList;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  getCurrencyPair: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, currencyPair } = ApiConfig;
    const url = baseSecure + currencyPair;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getSubAdminList: async () => {
    const { baseUrl, getSubAdminList } = ApiConfig;
    const url = baseUrl + getSubAdminList;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  getPartnersList: async () => {
    const { baseUser, getPartnersList } = ApiConfig;
    const url = baseUser + getPartnersList;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  getCoinListDetails: async () => {
    const { baseUser, getCoinListDetails } = ApiConfig;
    const url = baseUser + getCoinListDetails;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  getOrderManagement: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getallorder } = ApiConfig;
    const url = baseSecure + getallorder;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  AddsubAdmin: async (
    firstName,
    lastName,
    signId,
    passwords,
    confirmPassword,
    multipleSelectd
  ) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, AddsubAdmin } = ApiConfig;
    const url = baseUrl + AddsubAdmin;
    const params = {
      first_name: firstName,
      last_name: lastName,
      email_or_phone: signId,
      password: passwords,
      confirm_password: confirmPassword,
      permissions: multipleSelectd,
      admin_type: 0,
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  addNotify: async (notificationTitle, notification, notificationLink) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, addNotify } = ApiConfig;
    const url = baseUrl + addNotify;
    const params = {
      title: notificationTitle,
      message: notification,
      link: notificationLink,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },
  deleteNotify: async (_id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, deleteNotify } = ApiConfig;
    const url = baseUrl + deleteNotify;
    const params = {
      _id: _id
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  updateSubadminList: async (firstName, lastName, email, subadminId, multipleSelectd, adminType) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, updateSubadmin } = ApiConfig;
    const url = baseUrl + updateSubadmin;
    const params = {
      first_name: firstName,
      last_name: lastName,
      email_or_phone: email,
      id: subadminId,
      permissions: multipleSelectd,
      admin_type: adminType,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  AddTrade: async (firstName, lastName, gender, number, email, address) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, AddTrade } = ApiConfig;
    const url = baseSecure + AddTrade;
    const params = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      mobileNumber: number,
      emailId: email,
      line1: address,
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  deleteSubAdminList: async (userId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, subadmindelete } = ApiConfig;
    const url = baseUrl + subadmindelete;
    const params = {
      _id: userId,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },
  cancelOrder: async (orderID, userID) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, cancelOrder } = ApiConfig;
    const url = baseUrl + cancelOrder;
    const params = {
      order_id: orderID,
      userId: userID,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },
  handleSubadminStatus: async (Id, userId, status) => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, adminsupport } = ApiConfig;
    const url = baseSecure + adminsupport;
    const params = {
      _id: Id,
      userId: userId,
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleTradeStatus: async (userId, cell) => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, tradeStatus } = ApiConfig;
    const url = baseSecure + tradeStatus;
    const params = {
      _id: userId,
      status: cell,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getNotificationList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, notificationList } = ApiConfig;
    const url = baseUrl + notificationList;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  IssueList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, helplist } = ApiConfig;
    const url = baseSecure + helplist;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getFiatWithdraw: async () => {
    const { baseUrl, getInrWithrawList } = ApiConfig;
    const url = baseUrl + getInrWithrawList;
    const params = {};

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  getFiatDeposit: async () => {
    const { baseUrl, inrdepositreq } = ApiConfig;
    const url = baseUrl + inrdepositreq;
    const params = {};

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },


  fundTransfer: async (tokenName, chain, receiver, amount, email) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, fund_transfer } = ApiConfig;
    const url = baseUrl + fund_transfer;
    const params = {
      tokenName: tokenName,
      chain: chain,
      receiver: receiver,
      amount: amount,
      email: email
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFundDenied: async (id, status, Hash, adminId) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, transactionstatus } = ApiConfig;
    const url = baseUrl + transactionstatus;
    const params = {
      _id: id,
      status: status,
      transaction_hash: Hash,
      adminId: adminId
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFundApprove: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, transactionstatus } = ApiConfig;
    const url = baseSecure + transactionstatus;
    const params = {
      _id: id,
      status: "approve",
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFiatApprove: async (id, userId) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, userreqapprove } = ApiConfig;
    const url = baseSecure + userreqapprove;
    const params = {
      transId: id,
      userId: userId,
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleFiatDenied: async (id, userId) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, userreqreject } = ApiConfig;
    const url = baseSecure + userreqreject;
    const params = {
      transId: id,
      userId: userId,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  // handleFiatDApprove: async (id, userId) => {
  //   const token = sessionStorage.getItem("token");
  //   const { baseUrl, confirmInrDeposit } = ApiConfig;
  //   const url = baseUrl + confirmInrDeposit;
  //   const params = {
  //     _id: id,
  //     status: "APPROVE",
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //   };
  //   return ApiCallPost(url, params, headers);
  // },

  // handleFiatDrejected: async (id, userId) => {
  //   const token = sessionStorage.getItem("token");
  //   const { baseUrl, rejectInrDeposit } = ApiConfig;
  //   const url = baseUrl + rejectInrDeposit;
  //   const params = {
  //     _id: id,
  //     status: "CANCELLED",
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //   };
  //   return ApiCallPost(url, params, headers);
  // },

  addAdTicket: async (message, userId, id) => {
    const token = sessionStorage.getItem("token");
    const { baseHelp, addAdTicket } = ApiConfig;
    const url = baseHelp + addAdTicket;

    const params = {
      query: message,
      clientId: userId,
      ticketId: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  ticketList: async (userId, id) => {
    const token = sessionStorage.getItem("token");
    const { baseHelp, ticketList } = ApiConfig;
    const url = baseHelp + ticketList;

    const params = {
      userId: userId,
      id: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  sendUsersMail: async (userId, sendMail) => {
    const token = sessionStorage.getItem("token");
    const { baseData, sendmailtouser } = ApiConfig;
    const url = baseData + sendmailtouser;

    const params = {
      userId: userId,
      message: sendMail,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  uploadDocument: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseData, documentchange } = ApiConfig;
    const url = baseData + documentchange;
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    return ApiCallPost(url, formData, headers);
  },

  transferhistory: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, transferhistory } = ApiConfig;
    const url = baseUrl + transferhistory;
    const params = {
      userId: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },
  userWallet: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, userWallet } = ApiConfig;
    const url = baseUrl + userWallet;
    const params = {
      userId: id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  handleSubadminStatus2: async (userId, cell) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, SubadminStatus } = ApiConfig;
    const url = baseUrl + SubadminStatus;
    const params = {
      _id: userId,
      status: cell,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },
  createCategory: async (name) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, createCategory } = ApiConfig;
    const url = baseUrl + createCategory;
    const params = {
      name: name
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTotalRegistrations: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, todayNewRegistrations } = ApiConfig;
    const url = baseUrl + todayNewRegistrations;
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  PartnersStatus: async (userId, status) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, PartnersStatus } = ApiConfig;
    const url = baseUrl + PartnersStatus;
    const params = {
      partner_id: userId,
      admin_apporval: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  OpenOrderStatus: async (id, user_id) => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, OpenOrderStatus } = ApiConfig;
    const url = baseAdmin + OpenOrderStatus ;
    const params = {
      order_id: id,
      userId: user_id
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  CoinDetailsStatus: async (userId, cell) => {
    const token = sessionStorage.getItem("token");
    const { baseUser, CoinDetailsStatus } = ApiConfig;
    const url = baseUser + CoinDetailsStatus;
    const params = {
      _id: userId,
      status: cell,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  coinTransfer: async () => {
    const token = sessionStorage.getItem("token");
    const { baseWallet, getcpcoinbalance } = ApiConfig;
    const url = baseWallet + getcpcoinbalance;

    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTodayRegestration: async () => {
    const token = sessionStorage.getItem("token");

    const { baseSecure, getregistration } = ApiConfig;
    const url = baseSecure + getregistration;

    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTodayDeposit: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, depositrequest } = ApiConfig;
    const url = baseSecure + depositrequest;
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTodayWithdraw: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, withdrawlrequest } = ApiConfig;
    const url = baseSecure + withdrawlrequest;
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getToalDeposit: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, totaldepositrequest } = ApiConfig;
    const url = baseSecure + totaldepositrequest
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getToalWithdraw: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, totalwithdrawlrequest } = ApiConfig;
    const url = baseSecure + totalwithdrawlrequest;
    const params = {};

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getChangeScreen: async (userId, id) => {
    const token = sessionStorage.getItem("token");
    const { baseHelp, changeseen } = ApiConfig;
    const url = baseHelp + changeseen;

    const params = {
      clientId: userId,
      chatId: id,
      status: 2,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  // getCoinList: async () => {
  //   const { baseUrl, currencyCoinList } = ApiConfig;
  //   const url = baseUrl + currencyCoinList;
  //   const params = {};
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };

  //   return ApiCallGet(url, headers);
  // },

  getwalletCoinList: async (user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, walletCoinList } = ApiConfig;
    const url = baseSecure + walletCoinList;
    const params = {
      userId: user_Id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getAdmincoinaddress: async (coinName, user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, admincoinaddress } = ApiConfig;
    const url = baseSecure + admincoinaddress;
    const params = {
      type: coinName,
      userId: user_Id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  addBankAccount: async (accNumber, bankName, branchName, holderName, id, ifsc) => {
    const { baseUrl, addBankAcc } = ApiConfig;
    const url = baseUrl + addBankAcc;
    const params = {
      account_number: accNumber,
      bank_name: bankName,
      branch: branchName,
      holder_name: holderName,
      _id: id,
      ifsc: ifsc,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPut(url, params, headers);
  },

  getReceives: async (user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getreceive } = ApiConfig;
    const url = baseSecure + getreceive;
    const params = {
      userId: user_Id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getAccDetails: async () => {
    const { baseUrl, getAccDetails } = ApiConfig;
    const url = baseUrl + getAccDetails;
    const params = {};
    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallGet(url, params, headers);
  },

  addCoinWidthraw: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, setcoinwithdrawal } = ApiConfig;
    const url = baseSecure + setcoinwithdrawal;

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    };

    return ApiCallPut(url, formData, headers);
  },
  CoinCategory: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, CoinCategory } = ApiConfig;
    const url = baseUrl + CoinCategory;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },
  tradingCommission: async (skip, limit) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, tradingCommission } = ApiConfig;
    const url = baseUrl + tradingCommission;

    const params = {
      skip: skip,
      limit: limit
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },


  coinPaymentDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseWallet, getcpaccountinfo } = ApiConfig;
    const url = baseWallet + getcpaccountinfo;

    const params = {};
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  AddCoinPair: async (fShortName, fId, sShortName, sId, sellPrice, buyPrice, available) => {
    const token = sessionStorage.getItem("token");
    const { baseCoin, AddCoinPair } = ApiConfig;
    const url = baseCoin + AddCoinPair;
    const params = {
      base_currency: fShortName,
      quote_currency: sShortName,
      base_currency_id: fId,
      quote_currency_id: sId,
      buy_price: buyPrice,
      sell_price: sellPrice,
      available: available
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  AddPairFee: async (makerFee, takerFee, currencyID) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, AddPairFee } = ApiConfig;

    const url = baseSecure + AddPairFee;

    const params = {
      maker_fee: makerFee,
      taker_fee: takerFee,
      _id: currencyID,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  getCurrencyPairList: async () => {
    const token = sessionStorage.getItem("token");
    const { baseCoin, getCurrencyPairList } = ApiConfig;
    const url = baseCoin + getCurrencyPairList;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },

  deleteCurrency: async (_id, status) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, deleteCoinPair } = ApiConfig;
    const url = baseSecure + deleteCoinPair;
    const params = {
      _id: _id,
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },
  botStatus: async (_id, status, gap) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, botStatus } = ApiConfig;
    const url = baseSecure + botStatus;
    const params = {
      ids: [_id],
      status: status,
      gap: gap,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getTradingReport: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, tredingReport } = ApiConfig;
    const url = baseUrl + tredingReport;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  tradeHistory: async (skip, limit) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, tradeHistory } = ApiConfig;

    const url = baseUrl + tradeHistory;
    const params = {
      skip: skip,
      limit: limit
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  OrderBook: async (skip, limit) => {
    const token = sessionStorage.getItem("token");
    const { baseExchange, OrderBook } = ApiConfig;
    const url = baseExchange + OrderBook;
    const params = {
      skip: skip,
      limit: limit
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  OpenOrder: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, OpenOrders } = ApiConfig;
    const url = baseUrl + OpenOrders
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  tradeById: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseExchange, tradeById } = ApiConfig;

    const url = baseExchange + tradeById;
    const params = {
      "order_id": id
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getWithdrawalStatus: async (id, status) => {
    const token = sessionStorage.getItem("token");
    const { baseCoin, sendFundStatus } = ApiConfig;

    const url = baseCoin + sendFundStatus;

    const params = {
      _Id: id,
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  completeWithdrawalRequest: async (skip, limit) => {
    const { baseUrl, completeWithdrawalRequest } = ApiConfig;
    const url = baseUrl + completeWithdrawalRequest
    const params = {
      skip, limit
    }
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  PendingWithdrwal: async () => {
    const { baseUrl, PendingWithdrwal } = ApiConfig;
    const url = baseUrl + PendingWithdrwal
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  CancelledWithdrwal: async (skip, limit) => {
    const { baseUrl, CancelledWithdrwal } = ApiConfig;
    const url = baseUrl + CancelledWithdrwal;
    const params = {
      skip, limit
    }
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  completeDepositRequest: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, completeDepositRequest } = ApiConfig;
    const url = baseUrl + completeDepositRequest
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },
  completePendingRequest: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, completePendingRequest } = ApiConfig;

    const url = baseUrl + completePendingRequest


    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },
  miscellaneousRequest: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, miscellaneousRequest } = ApiConfig;

    const url = baseUrl + miscellaneousRequest;


    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },

  getUserWalletList: async (coinName) => {
    const { baseUrl, getUserWalletList } = ApiConfig;

    const url = baseUrl + getUserWalletList;

    const params = {
      coinName: coinName,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },


  fundsTransfer: async (coinId, userId, amount, type, accType, selectedChain) => {
    const { baseUrl, fundsTransfer } = ApiConfig;

    const url = baseUrl + fundsTransfer;

    const params = {
      userId: userId,
      coinId: coinId,
      type: type,
      amount: amount,
      account_type: accType,
      chain: selectedChain,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },
  MasterAccount: async (userId, makerFee, takerFee, status) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, MasterAccount } = ApiConfig;
    const url = baseUrl + MasterAccount;
    const params = {
      userId: userId,
      maker_fee: makerFee,
      taker_fee: takerFee,
      status: status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  userWalletTransfer: async (coinId, user_Id, sendWalletTo, amount, otp) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, userWalletTransfer } = ApiConfig;
    const url = baseSecure + userWalletTransfer;

    const params = {
      userId: user_Id,
      coinId: coinId,
      to_address: sendWalletTo,
      amount: +amount,
      otp: +otp,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  walletTransfer: async (coinId, user_Id, walletTo, requestOtp, amount) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, walletTransfer } = ApiConfig;
    const url = baseSecure + walletTransfer;

    const params = {
      userId: user_Id,
      coinId: coinId,
      to_address: walletTo,
      amount: +amount,
      otp: +requestOtp,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  // AddrewarRate: async (reward) => {
  //   const token = sessionStorage.getItem("token");

  //   const { baseUrl, setrewardrate } = ApiConfig;
  //   const url = baseUrl + setrewardrate;
  //   const params = {
  //     amount: reward,
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //   };
  //   return ApiCallPost(url, params, headers);
  // },

  // AddtdsRate: async (tdsRate) => {
  //   const token = sessionStorage.getItem("token");

  //   const { baseSecure, updatetdsrate } = ApiConfig;
  //   const url = baseSecure + updatetdsrate;
  //   const params = {
  //     rate: tdsRate,
  //   };
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: token,
  //   };
  //   return ApiCallPost(url, params, headers);
  // },

  updateEmailTamplate: async (emailSubject, key, template) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, updatemailTamplate } = ApiConfig;
    const url = baseSecure + updatemailTamplate;
    const params = {
      emailSubject: emailSubject,
      key: key,
      template: template,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  getUserList: async () => {
    const { baseUrl, tradersList } = ApiConfig;
    const url = baseUrl + tradersList;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },
  updateStatus: async (id, status) => {
    const { baseUrl, updateStatus } = ApiConfig;
    const url = baseUrl + updateStatus;
    const params = {
      _id: id,
      status
    }
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallPut(url, params, headers);
  },

  getCoinList: async () => {
    const { baseCoin, getCoinList } = ApiConfig;
    const url = baseCoin + getCoinList;

    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  verifyBankDetails: async (id, status) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, verifyBankDetails } = ApiConfig;
    const url = baseUrl + verifyBankDetails;
    const params = {
      _id: id,
      status: +status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  approveUPIDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, approveUPIDetails } = ApiConfig;
    const url = baseAdmin + approveUPIDetails;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },


  pendingUPIDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, pendingUPIDetails } = ApiConfig;
    const url = baseAdmin + pendingUPIDetails;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  partnerWithdrawalRequests: async () => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, partnerWithdrawalRequests } = ApiConfig;
    const url = baseAdmin + partnerWithdrawalRequests;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  partner_update_withdrawal_status: async (_id, status, transaction_hash) => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, partner_update_withdrawal_status } = ApiConfig;
    const url = baseAdmin + partner_update_withdrawal_status;
    const params = {
      _id, status, transaction_hash
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  createPartner: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, createPartner } = ApiConfig;
    const url = baseAdmin + createPartner;

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };
    return ApiCallPost(url, formData, headers);
  },

  pairPrice: async () => {
    const token = sessionStorage.getItem("token");
    const { basePartner, pairPrice } = ApiConfig;
    const url = basePartner + pairPrice;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  partner_deposit_payouts_list: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, partner_deposit_payouts_list } = ApiConfig;
    const url = baseUrl + partner_deposit_payouts_list;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  partner_monthly_payouts_list: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, partner_monthly_payouts_list } = ApiConfig;
    const url = baseUrl + partner_monthly_payouts_list;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },

  verifyUPIDetails: async (id, status) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, verifyUPIDetails } = ApiConfig;
    const url = baseUrl + verifyUPIDetails;
    const params = {
      _id: id,
      status: +status,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },


  rejectUPIDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseAdmin, rejectUPIDetails } = ApiConfig;
    const url = baseAdmin + rejectUPIDetails;

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },


  exportPandingList: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, pendingtrader } = ApiConfig;
    const url = baseReport + pendingtrader;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  exportFiatManagement: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, fiatwithreq } = ApiConfig;
    const url = baseReport + fiatwithreq;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  exportApprovedList: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, verifiedtrader } = ApiConfig;
    const url = baseReport + verifiedtrader;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  exportFiatDeposit: async (dateFrom, dateTo) => {
    const token = sessionStorage.getItem("token");
    const { baseReport, fiatdepreq } = ApiConfig;
    const url = baseReport + fiatdepreq;
    const params = {
      fromDate: dateFrom,
      toDate: dateTo,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  addCoins: async (formData) => {
    const { baseCoin, addNewCoins } = ApiConfig;

    const url = baseCoin + addNewCoins;

    const params = {
    };
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    return ApiCallPost(url, formData, headers);
  },

  getMasterWalletList: async (user_Id) => {
    const token = sessionStorage.getItem("token");
    const { baseSecure, getMasterWalletList } = ApiConfig;

    const url = baseSecure + getMasterWalletList;

    const params = {
      userId: user_Id,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  walletStatus: async (_id, withdrawalstatus) => {
    const { baseSecure, walletStatus } = ApiConfig;

    const url = baseSecure + walletStatus;

    const params = {
      userId: _id,
      status: withdrawalstatus,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },

  getstakingDetails: async () => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, stakingList } = ApiConfig;
    const url = baseUrl + stakingList;
    const params = {}
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallPost(url, params, headers);
  },

  AddBanner: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, Addbanner } = ApiConfig;
    const url = baseUrl + Addbanner;
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };

    return ApiCallPost(url, formData, headers);
  },


  updateBannerList: async (formData) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, updateBanner } = ApiConfig;
    const url = baseUrl + updateBanner;
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    };

    return ApiCallPut(url, formData, headers);
  },

  deletebannerlist: async (id) => {
    const token = sessionStorage.getItem("token");
    const { baseUrl, bannerdelete } = ApiConfig;
    const url = baseUrl + bannerdelete + `${id}`;
    const params = {}
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallDelete(url, params, headers);
  },

  handleBannerStatus: async (userId, cell) => {
    const token = sessionStorage.getItem("token");

    const { baseUrl, BannerStatus } = ApiConfig;
    const url = baseUrl + BannerStatus;
    const params = {
      _id: userId,
      status: cell,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPut(url, params, headers);
  },

  getUpiOtp: async (signId) => {
    const { baseUrl, getOtp } = ApiConfig;
    const url = baseUrl + getOtp;

    const params = {
      signId: signId,
    }
    const headers = {
      "Content-Type": "application/json",
    };

    return ApiCallPost(url, params, headers);
  },

  qbshistory: async () => {
    const token = sessionStorage.getItem("token")
    const { baseUrl, qbshistory } = ApiConfig;
    const url = baseUrl + qbshistory;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },

  getMyActivityLogs: async () => {
    const token = sessionStorage.getItem("token")
    const { baseUser, getMyLogs } = ApiConfig;
    const url = baseUser + getMyLogs;
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    return ApiCallGet(url, headers);
  },

  getUserWallet: async () => {
    const { baseUrl, user_walletdd } = ApiConfig;
    const url = baseUrl + user_walletdd;
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },

  updateTicketStatus: async (id, status) => {
    const token = sessionStorage.getItem("token");
    const { baseSupport, updateTicketStatus } = ApiConfig;
    const url = baseSupport + updateTicketStatus;
    const params = {
      status: status,
      ticket_id: id,
    };
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  p2pCoinList: async () => {
    const token = sessionStorage.getItem('token');
    const { baseCoin, p2pCoinList } = ApiConfig;
    const url = baseCoin + p2pCoinList;
    const headers = {
      'Content-Type': 'application/json',
      "Authorization": token,
    };
    return ApiCallGet(url, headers);
  },

  fiatCurrencyList: async () => {
    const token = sessionStorage.getItem('token');
    const { baseP2P, fiatCurrencyList } = ApiConfig;
    const url = baseP2P + fiatCurrencyList;
    const headers = {
      'Content-Type': 'application/json',
      "Authorization": token,
    };
    return ApiCallGet(url, headers);
  },

  all_p2p_orders: async () => {
    const token = sessionStorage.getItem('token');
    const { baseP2P, all_p2p_orders } = ApiConfig;
    const url = baseP2P + all_p2p_orders;
    const headers = {
      'Content-Type': 'application/json',
      "Authorization": token,
    };
    return ApiCallGet(url, headers);
  },

  getAllTickets: async () => {
    const token = sessionStorage.getItem("token");
    const { baseSupport, getAllTickets } = ApiConfig;
    const url = baseSupport + getAllTickets;
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallGet(url, headers);
  },


  replyTicket: async (messagerply, id) => {
    const token = sessionStorage.getItem("token");
    const { baseSupport, replyTicket } = ApiConfig;
    const url = baseSupport + replyTicket;
    const params = {
      replyBy: 0,
      query: messagerply,
      ticket_id: id,
    };
    const headers = {
      "content-Type": "application/json",
      Authorization: token,
    };
    return ApiCallPost(url, params, headers);
  },

  orderDetails: async (orderId) => {
    const { baseP2P, orderDetails } = ApiConfig;
    const url = baseP2P + orderDetails;
    const params = {
      order_id: orderId
    };
    const headers = {
      "content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  handleDispute: async (orderId) => {
    const { baseP2P, orderDispute } = ApiConfig;
    const url = baseP2P + orderDispute;
    const params = {
      order_id: orderId
    };
    const headers = {
      "content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  statusToSettle: async (orderId) => {
    const { baseP2P, statusToSettle } = ApiConfig;
    const url = baseP2P + statusToSettle;
    const params = {
      order_id: orderId
    };
    const headers = {
      "content-Type": "application/json",
    };
    return ApiCallPost(url, params, headers);
  },

  getReferredUserData: async (code) => {
    const url = `https://cvtoken.us/stake/api/user-data/${code}`
    const headers = {
      "Content-Type": "application/json",
    };
    return ApiCallGet(url, headers);
  },



};

export default AuthService;
