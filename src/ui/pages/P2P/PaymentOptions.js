import React, { useState, useEffect } from "react";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import AuthService from "../../../api/services/AuthService";
import { CSVLink } from "react-csv";
import { $ } from "react-jquery-plugin";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";
import Swal from "sweetalert2";

const PaymentOptions = () =>{

   const [paymentList, setPaymentList] = useState([])
   const [type, setType] = useState()   

  useEffect(() => {
    handlePaymentList();
  }, []);

  const handlePaymentList= async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getPaymentList().then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
            setPaymentList(result.data);
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };

  
  const HandlePaymentType = async (type) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.paymentType(type).then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          alertSuccessMessage(result.message)
          handlePaymentList()
        } catch (error) {
          alertErrorMessage(error);
        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage(result.message);
      }
    });
  };

  const buttonHandler = async (id) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.paymentTypeRemove(id).then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          alertSuccessMessage(result.message)
          handlePaymentList()
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
        <button type="button" className="btn btn-sm btn-danger" onClick={()=>buttonHandler(row?._id)}>Remove</button>
      </div>
    );
  };
  
  

  const columns = [
    { name: "Payment Type", selector: row => row.payment_type.toUpperCase(),},
    { name: "Action", selector: linkFollow },

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
                          Payment Management
                        </h1>
                      </div>
                      <div className="col-auto mt-4">
                        <div class="row">
                          <div class="d-flex">
                            <button
                              class="btn btn-block" style={{backgroundColor: "#353535", color: "white"}}
                              data-bs-toggle="modal"
                              data-bs-target="#payment_type"
                              type="button"
                            >
                              Add New
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
                      <div className="card-body">
                        <form className="row">
                          <div className="col-12">
                            <div class="table-responsive">
                              <DataTableBase columns={columns} data={paymentList} />
    
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
    
      
          {/* Add Type*/}
          <div class="modal" id="payment_type" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
            <div class="modal-dialog  alert_modal" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">
                    Add New Payment Option
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
                      <label className="small mb-1">Payment Type</label>
                      <input
                        class="form-control  form-control-solid"
                        type="text"
                        onChange={(e) => setType(e.target.value) }
                        value={type}
                      />
                    </div>
                    <button
                      class="btn btn-indigo btn-block w-100"
                      data-bs-dismiss="modal"
                      type="button"
                      onClick={() => HandlePaymentType(type)}
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
    

    export default PaymentOptions;