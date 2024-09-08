import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage, } from "../../../customComponent/CustomAlertMessage";
import TraderDetails from "../TraderDetails";
import { CSVLink } from "react-csv";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";

const TradeList = () => {
  const [activeScreen, setActiveScreen] = useState("userdetail");
  const [userId, setUserId] = useState("");
  const [exportData, setExportData] = useState([]);
  const [allData, setallData] = useState([]);
  const [traderData, settraderData] = useState();

  const linkFollow = (row) => {
    return (
      <div>
        <button className="btn btn-dark btn-sm me-2" onClick={() => { settraderData(row); setUserId(row?._id); setActiveScreen("detail") }} >View</button>
        {row?.status === 'Active' ?
          <button className="btn btn-success btn-sm  me-2" onClick={() => { handleStatus(row?.id, 'Inactive') }} >Active</button>
          : <button className="btn btn-danger btn-sm  me-2" onClick={() => { handleStatus(row?.id, 'Active') }}  >Inactive</button>}
      </div>
    );
  };

  const columns = [
    { name: "User ID", wrap: true, selector: row => row._id, },
    { name: "Name", sort: true, wrap: true, selector: row => row?.firstName ? (row?.firstName + " "+ row?.lastName) : "-----" , },
    { name: "Email", sort: true, wrap: true, selector: row => row.emailId ? row.emailId : "-----", },
    { name: <div style={{whiteSpace:"revert"}}>Phone Number</div>, wrap: true, sort: true, selector: row => row.mobileNumber ? row.mobileNumber: "-----", },
    { name: <div style={{whiteSpace:"revert"}}>Registration Date</div>, wrap: true, sort: true, selector: row => moment(row?.createdAt).format("Do MMMM YYYY") },
    { name: "Action",  wrap: true, selector: linkFollow, },

  ];

  useEffect(() => {
    handleUserData();
  }, []);

  const handleStatus = async (_id, status) => {
    await AuthService.updateStatus(_id, status).then(
      async (result) => {
        if (result.success) {
          try {
            handleUserData();
            alertSuccessMessage(result.message);
          } catch (error) {
            alertErrorMessage(error);
          }
        } else {
          alertErrorMessage(result.message);
        }
      }
    );
  };

  const handleUserData = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getUserList().then(async (result) => {
      if (result.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setExportData(result?.data.reverse());
          setallData(result?.data);
        } catch (error) {
          alertErrorMessage(error);

        }
      } else {
        LoaderHelper.loaderStatus(false);
        alertErrorMessage("No Data Available");

      }
    });
  };


  function searchObjects(e) {
    const keysToSearch = ["firstName", "lastName", "emailId", "mobileNumber", "_id", "createdAt"];
    const userInput = e.target.value;
    const searchTerm = userInput?.toLowerCase();
    const matchingObjects = allData.filter(obj => {
      return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm));
    });
    setExportData(matchingObjects);
  }

  return activeScreen === "userdetail" ? (
    <div id="layoutSidenav_content">
      <main>
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
          <div className="container-xl px-4">
            <div className="page-header-content pt-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <i className="fa fa-wave-square"></i>
                    </div>
                    Traders List
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-xl px-4 mt-n10">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
                Traders Details
              <div className="col-5">
                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={searchObjects} />
              </div>
              {exportData.length === 0 ? "" :
              <div className="dropdown">
                <button
                  className="btn btn-dark btn-sm dropdown-toggle"
                  id="dropdownFadeInUp"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {" "}
                  <i className="fa fa-download me-3"></i> Export
                </button>
                <div
                  className="dropdown-menu animated--fade-in-up"
                  aria-labelledby="dropdownFadeInUp"
                >
                  <CSVLink data={exportData} className="dropdown-item">
                    Export as CSV
                  </CSVLink>
                </div>
              </div>}
            </div>
            <div className="card-body">
              <div className="table-responsive" width="100%">
                <DataTableBase columns={columns} data={exportData} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <TraderDetails userId={userId} traderData={traderData} />
  );
};

export default TradeList;
