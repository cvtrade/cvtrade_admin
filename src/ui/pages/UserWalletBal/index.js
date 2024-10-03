import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";


const UserWalletBal = () => {


  const [walletData, setWalletData] = useState([]);
  const [hideZeroBal, setHideZeroBal] = useState(true);
  const [allData, setAllData] = useState([]);

  const handleHideZeroBal = (e) => {
    setHideZeroBal(e.target.checked)
  };
  const columns = [
    { name: "User Id", width: "200px", sort: true, wrap: true, selector: row => row.user_id ? row.user_id : "-----", },
    { name: "Email", width: "200px", sort: true, wrap: true, selector: row => row.emailId ? row.emailId : "-----", },
    { name: "Mobile Number", width: "150px", sort: true, wrap: true, selector: row => row.mobileNumber || "-----", },
    { name: "Name", width: "150px", sort: true, wrap: true, selector: row => row?.firstName ? (row?.firstName + " " + row?.lastName) : "-----", },
    { name: "CVT Balance", width: "150px", sort: true, wrap: true, selector: row => row.cvtBalance || "0", },
    { name: "CVT Locked Balance", width: "150px", sort: true, wrap: true, selector: row => row.cvtLockedBalance || "0", },
    { name: "CVT Total", width: "150px", sort: true, wrap: true, selector: row => row.cvtTotal || "0", },
    { name: "USDT Balance", width: "150px", sort: true, wrap: true, selector: row => row.usdtLockedBalance || "0", },
    { name: "USDT Locked Balance", width: "150px", sort: true, wrap: true, selector: row => row.usdtLockedBalance || "0", },
    { name: "USDT Total", width: "150px", sort: true, wrap: true, selector: row => row.usdtTotal || "0", },
  ];

  useEffect(() => {
    if (allData?.length > 0) {
      if (hideZeroBal) {
        let filteredItem = allData?.filter((item) => item?.cvtTotal > 0 || item?.usdtTotal > 0)
        setWalletData(filteredItem?.reverse())
      } else {
        setWalletData(allData?.reverse())
      }
    }

  }, [hideZeroBal,allData]);


  useEffect(() => {
    handleWalletDetails()
  }, []);

  const handleWalletDetails = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getUserWallet().then(async result => {
      if (result?.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setWalletData(result?.data);
          setAllData(result?.data);
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage("Something Went Wrong");
      }
    });
  };


  return (

    <div id="layoutSidenav_content">
      <main>
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
          <div className="container-xl px-4">
            <div className="page-header-content pt-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                  <h1 className="page-header-title">
                    <div className="page-header-icon"><i className="fa fa-wallet"></i></div>
                    User Wallet Balance
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-xl px-4 mt-n10">
          <div className="card mb-4">
            <div class="card-header">User Wallet Balance
              <div className="col-3">
                <input className="mx-2" id="hideZero" type="checkbox" checked={hideZeroBal} onChange={handleHideZeroBal} />
                <label for="hideZero">Hide 0 Balance</label>
              </div>
              <div class="dropdown">
                <button class="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export </button>
                <div class="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                  <CSVLink data={walletData} class="dropdown-item">Export as CSV</CSVLink>
                </div>
              </div>
            </div>
            <div className="table-responsive" width="100%">
              <DataTableBase columns={columns} data={walletData} pagination={true} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserWalletBal;


