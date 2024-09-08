import React, { useState, useEffect } from "react";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
import { CSVLink } from "react-csv";
import { $ } from "react-jquery-plugin";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";
import Swal from "sweetalert2";

const CurrencyList = () => {

  const [cryptoList, setCryptoList] = useState([]);
  const [fiatList, setFiatList] = useState([])
  const [currency, setCurrency] = useState('')
  const [coinList, setCoinList] = useState([])

  useEffect(() => {
    handleCryptoList();
    handleFiatList();
    handleCoinList()
  }, []);

  const handleCoinList = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getCoinList().then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setCoinList(result.data);
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };


  const handleCryptoList = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.p2pCoinList().then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setCryptoList(result.data);
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };


  const handleFiatList = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.fiatCurrencyList().then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setFiatList(result.data);
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };

  const handleAddCurrency = async (currency, type) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.addCurrency(currency, type).then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          if (type == "CRYPTO") {
            handleCryptoList()
          } else {
            handleFiatList()
          }
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };

  const handleRemoveCurrency = async (currency, type) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.remove_currency(currency, type).then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          if (type == "CRYPTO") {
            handleCryptoList()
          } else {
            handleFiatList()
          }
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };


  // *******Table for List Of Currency Pairs ************//
  const linkFollow = (row) => {
    return (
      <div>
        <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveCurrency(row?.short_name, "CRYPTO")}>Remove</button>
      </div>
    );
  };

  const linkFollowFiat = (row) => {
    return (
      <div>
        <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveCurrency(row?.short_name, "FIAT")}>Remove</button>
      </div>
    );
  };



  const columns = [
    { name: "Currency Name", selector: row => row.short_name, },
    { name: "Action", selector: linkFollow },
  ];

  const columnsFiat = [
    { name: "Currency Name", selector: row => row.short_name, },
    { name: "Action", selector: linkFollowFiat },
  ];

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
                        <i className="fa fa-prescription"></i>
                      </div>
                      Currency Management
                    </h1>
                  </div>
                  <div className="col-auto mt-4">
                    <div class="row">
                      <div class="d-flex">
                        <button
                          class="btn btn-block" style={{ backgroundColor: "#353535", color: "white" }}
                          data-bs-toggle="modal"
                          data-bs-target="#add_currency"
                          type="button"
                        >
                          Add Crypto Currency
                        </button>
                        <button
                          class="btn mx-2 btn-block" style={{ backgroundColor: "#353535", color: "white" }}
                          data-bs-toggle="modal"
                          data-bs-target="#add_fiat_currency"
                          type="button"
                        >
                          Add Fiat Currency
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="container-xl px-4 mt-n10">
            <div className="row">
              <div className="col-xl-6">
                <div class="card">
                  <div class="card-header">
                    Crypto Currency
                    <div class="dropdown">
                      <button
                        class="btn btn-dark btn-sm dropdown-toggle"
                        id="dropdownFadeInUp"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Export
                      </button>
                      <div
                        class="dropdown-menu animated--fade-in-up"
                        aria-labelledby="dropdownFadeInUp"
                      >
                        <CSVLink class="dropdown-item" data={cryptoList}>
                          Export as CSV
                        </CSVLink>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form className="row">
                      <div className="col-12">
                        <div class="table-responsive">
                          <DataTableBase columns={columns} data={cryptoList} responsive={true} />

                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div class="card">
                  <div class="card-header">
                    Fiat Currency
                    <div class="dropdown">
                      <button
                        class="btn btn-dark btn-sm dropdown-toggle"
                        id="dropdownFadeInUp"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Export
                      </button>
                      <div
                        class="dropdown-menu animated--fade-in-up"
                        aria-labelledby="dropdownFadeInUp"
                      >
                        <CSVLink class="dropdown-item" data={fiatList}>
                          Export as CSV
                        </CSVLink>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form className="row">
                      <div className="col-12">
                        <div class="table-responsive">
                          <DataTableBase columns={columnsFiat} data={fiatList} />

                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>


      {/* Add Currency */}
      <div class="modal" id="add_currency" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Crypto Currency
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-4 ">
                  <select className="form-select form-control shadow-soft-inner" onChange={(e) => setCurrency(e.target.value)} value={currency}>
                    <option value='' disabled selected>Select Currency</option>
                    {coinList ? coinList?.map((item, index) => {
                      return (
                        <option key={index}>{item?.short_name}</option>
                      )
                    }) : null}
                  </select>
                </div>
                <button
                  class="btn btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleAddCurrency(currency, "CRYPTO")}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" id="add_fiat_currency" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
        <div class="modal-dialog  alert_modal" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Fiat Currency
              </h5>
              <button
                class="btn-close"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mb-4 ">
                  <select className="form-select form-control shadow-soft-inner" onChange={(e) => setCurrency(e.target.value)} value={currency}>
                    <option value='' disabled selected>Select Currency</option>
                    {coinList ? coinList?.map((item, index) => {
                      return (
                        <option key={index}>{item?.short_name}</option>
                      )
                    }) : null}
                  </select>
                </div>
                <button
                  class="btn btn-indigo btn-block w-100"
                  data-bs-dismiss="modal"
                  type="button"
                  onClick={() => handleAddCurrency(currency, "FIAT")}
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default CurrencyList;