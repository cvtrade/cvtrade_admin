import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import { $ } from "react-jquery-plugin";
import DataTableBase from "../../../customComponent/DataTable";
import ReactPaginate from "react-paginate";


const FundsPendingWithdrawal = () => {
  const [fundWithdrawal, setFundWithdrawal] = useState([]);
  const [allData, setAllData] = useState([]);
  const [totalAmount, setTotalAmount] = useState({});
  const [trHash, setTrHash] = useState('');
  const [id, setId] = useState();

  const [tokenName, setTokenName] = useState('');
  const [chain, setChain] = useState('');
  const [receiver, setReciver] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');


  const adminId = sessionStorage.getItem("userId")

  const linkFollow = (row) => {
    return (
      <div className="d-flex gap-2">
        <button className="btn btn-success btn-sm" type="button" onClick={() => ShowWithdrawModal(row)} >
          Approve
        </button>
        <button className=" btn btn-danger btn-sm" type="button" onClick={() => HandleWithdrawalStatus(row?._id, 'REJECTED')}>
          Reject
        </button>
      </div>
    );
  };

  const ShowWithdrawModal = (row) => {
    setId(row?._id)
    setChain(row.chain);
    setReciver(row.to_address);
    setEmail(row.emailId);
    setAmount(row.amount);
    setTokenName(row.short_name)
    $("#funds_modal").modal("show");
  };

  const handleFundTransfer = async (tokenName, chain, receiver, amount, email) => {
    LoaderHelper.loaderStatus(true)
    await AuthService.fundTransfer(tokenName, chain, receiver, amount, email).then(async result => {
      LoaderHelper.loaderStatus(false)
      if (result?.success) {
        alertSuccessMessage(result?.message)
        if (result?.data?.transaction_hash) {
          HandleWithdrawalStatus(id, 'COMPLETE', result?.data?.transaction_hash)
        }
      } else {
        alertErrorMessage(result?.message)
      }
    })
  };

  const HandleWithdrawalStatus = async (id, status, trHash) => {
    LoaderHelper.loaderStatus(true)
    await AuthService.handleFundDenied(id, status, trHash, adminId).then(async result => {
      LoaderHelper.loaderStatus(false)
      if (result?.success) {
        $("#funds_modal").modal("hide");
        handleFundWithdrawal();
        alertSuccessMessage(result?.message)
      } else {
        alertErrorMessage(result?.message)
      }
    })
  };

  const columns = [
    { name: "Sr No.", wrap: true, selector: (row, index) => index + 1, },
    { name: "Date", selector: row => moment(row?.createdAt).format("MMM Do YYYY hh:mm A"), wrap: true },
    { name: "Email Id", wrap: true, selector: row => row.emailId, },
    { name: <div style={{ whiteSpace: "revert" }}>Mobile Number</div>, selector: row => row?.mobileNumber, wrap: true },
    { name: "Chain", selector: row => row.chain, },
    { name: "Coin Name", wrap: true, selector: row => row.short_name, },
    { name: "User Id", wrap: true, selector: row => row.user_id, },
    { name: <div style={{ whiteSpace: "revert" }}>Withdrawal Address</div>, wrap: true, selector: row => row.to_address, },
    { name: "Amount", wrap: true, selector: row => row.amount, },
    { name: "Fee", wrap: true, selector: row => row.fee, },
    { name: "Status", grow: 1.5, selector: linkFollow, },
  ];

  useEffect(() => {
    handleFundWithdrawal();
  }, []);

  const handleFundWithdrawal = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.PendingWithdrwal().then(async (result) => {
      LoaderHelper.loaderStatus(false);
      if (result?.success) {
        try {
          setFundWithdrawal(result?.data);
          setAllData(result?.data);

          const currencyTotals = {};
          result?.data.forEach(transaction => {
            const { short_name, amount } = transaction;
            if (currencyTotals[short_name]) {
              currencyTotals[short_name] += amount;
            } else {
              currencyTotals[short_name] = amount;
            }
          });
          setTotalAmount(currencyTotals)
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage("Something Went Wrong");
      }
    });
  };
  function handleSearch(e) {
    const keysToSearch = ["emailId", "chain", "short_name", "user_id", "to_address", "amount", "mobileNumber"];
    const searchTerm = e.target.value?.toLowerCase();
    const matchingObjects = allData?.filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
    setFundWithdrawal(matchingObjects);
  };

  return (
    <>
      <div id="layoutSidenav_content">
        <main>
          <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
              <div className="page-header-content pt-4">
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mt-4">
                    <h1 className="page-header-title">
                      <div className="page-header-icon">
                        <i className="fa fa-dollar-sign"></i>
                      </div>
                      Pending Withdrawal
                    </h1>
                    <div>
                    Total Amount  {Object.entries(totalAmount).map(([currency, total]) => {
                        return (
                          <> 
                         
                          <span className="mx-2 text-warning" key={currency}>
                            {currency}: {total?.toFixed()} 
                          </span>
                          </>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="card mb-4">
              <div className="card-header">
                Pending Withdrawal
                <div className="col-5">
                  <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={handleSearch} />
                </div>
                {fundWithdrawal.length === 0 ? "" :
                  <div className="dropdown">
                    <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Export{" "}
                    </button>
                    <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                      <CSVLink data={fundWithdrawal} className="dropdown-item">
                        Export as CSV
                      </CSVLink>
                    </div>
                  </div>}
              </div>
              <div className="table-responsive" width="100%">
                <DataTableBase columns={columns} data={fundWithdrawal} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="modal" id="funds_modal" tabindex="-1" role="dialog" aria-labelledby="funds_modal_modalTitle" aria-hidden="true">
        <div className="modal-dialog  alert_modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group  mb-3 position-relative ">
                  <label className="small mb-1"> Email Address </label>
                  <input className="form-control form-control-solid input-copy" type="text" Placeholder="Enter Transaction Hash " value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>

                <div className="form-group  mb-3 position-relative ">
                  <label className="small mb-1"> Token Name </label>
                  <input className="form-control  form-control-solid input-copy" type="text" Placeholder="Enter Transaction Hash " value={tokenName} onChange={(e) => setTokenName(e.target.value)}></input>
                </div>


                <div className="form-group  mb-3 position-relative ">
                  <label className="small mb-1"> Chain </label>
                  <input className="form-control  form-control-solid input-copy" type="text" Placeholder="Enter Transaction Hash " value={chain} onChange={(e) => setChain(e.target.value)}></input>
                </div>


                <div className="form-group  mb-3 position-relative ">
                  <label className="small mb-1"> Reciver Address </label>
                  <input className="form-control  form-control-solid input-copy" type="text" Placeholder="Enter Transaction Hash " value={receiver} onChange={(e) => setReciver(e.target.value)}></input>
                </div>

                <div className="form-group  mb-3 position-relative ">
                  <label className="small mb-1"> Amount </label>
                  <input className="form-control  form-control-solid input-copy" type="text" Placeholder="Enter Transaction Hash " value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                </div>

                <div className="form-group mt-3 position-relative">
                  <button className="btn btn-success   btn-block w-100" type="button" onClick={() => handleFundTransfer(tokenName, chain, receiver, amount, email)}>
                    Approve
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default FundsPendingWithdrawal;
