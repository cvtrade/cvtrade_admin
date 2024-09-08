import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";


const UserWalletBal = () => {


  const [walletData, setWalletData] = useState([]);


  const columns = [
    { name: "Email", sort: true, wrap: true, selector: row => row.emailId ? row.emailId : "-----", },
    { name: "Mobile Number", sort: true, wrap: true, selector: row => row.mobileNumber || "-----", },
    { name: "Name", sort: true, wrap: true, selector: row => row?.firstName ? (row?.firstName + " "+ row?.lastName) : "-----" , },
    { name: "CVT Balance", sort: true, wrap: true, selector: row => row.cvtBalance || "0", },
    { name: "CVT Locked Balance", sort: true, wrap: true, selector: row => row.cvtLockedBalance || "0", },
    { name: "CVT Total", sort: true, wrap: true, selector: row => row.cvtTotal || "0", },
    { name: "USDT Balance", sort: true, wrap: true, selector: row => row.usdtLockedBalance || "0", },
    { name: "USDT Total", sort: true, wrap: true, selector: row => row.usdtTotal || "0", },
  ];




  useEffect(() => {
    handleWalletDetails()
  }, []);

  const handleWalletDetails = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getUserWallet().then(async result => {
      if (result?.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setWalletData(result?.data?.reverse());
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
              <div class="dropdown">
                <button class="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export </button>
                <div class="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                  <CSVLink data={walletData} class="dropdown-item">Export as CSV</CSVLink>
                </div>
              </div>
            </div>
            <div className="card-body mt-3">
              <table className="" width="100%" >
                <DataTableBase columns={columns} data={walletData} />
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserWalletBal;


