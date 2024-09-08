import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import Supportmessage from "../Supportmessage";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";
import DataTable from "react-data-table-component";

const SupportPage = () => {
  const [issueList, setIssueList] = useState([]);
  const [emailId, setEmailID] = useState([]);
  const [description, setDescription] = useState([]);
  const [ticketId, setTicketId] = useState('');
  const [activeScreen, setActiveScreen] = useState('support');


  const linkEmail = (row) => {
    return (
      <div onClick={() => nextPage(row)}>
        <span className={row?.seen === 1 ? "fw-bolder" : ""}>{row?.emailId} </span>
      </div>
    );
  };


  const linkSubject = (row) => {
    return (
      <div onClick={() => nextPage(row)} >
        <span className={row?.seen === 1 ? "fw-bolder" : ""}>{row?.subject} </span>
      </div>
    );
  };
  
  const linkUserId = (row) => {
    return (
      <div onClick={() => nextPage(row)} >
        <span className={row?.seen === 1 ? "fw-bolder" : ""}>{row?.userId} </span>
      </div>
    );
  };

  const linkDescription = (row) => {
    return (
      <div onClick={() => nextPage(row)}>
        <span className={row?.seen === 1 ? "fw-bolder" : ""}>
          {row?.status} <small><i class={row?.seen === 1 ? "fa fa-circle ms-2 text-success" : ""}></i></small>
        </span>
      </div>
    );
  };

  const statuslinkFollow = (row) => {
    return (
      <>{row?.status === "Open" ?
        <>  <button class="btn btn-sm btn-danger " onClick={() => handleStatus(row?._id, 'Closed')}>Close</button>
          <button class="btn btn-sm btn-success mx-1" onClick={() => handleStatus(row?._id, "Resolved")}>Resolve</button>
          <button class="btn btn-sm btn-primary" onClick={() => nextPage(row)}>Chat</button>
        </> :
        <>  {row?.status}
          <button class="btn btn-sm btn-primary mx-1" style={{ marginLeft: "20px" }} onClick={() => nextPage(row)}>Chat</button>

        </>
      }

      </>
    );
  };

  const handleStatus = async (Id, status) => {
    await AuthService.updateTicketStatus(Id, status).then(async result => {
      if (result?.success) {
        handleIssueList();
      } else {
        alertErrorMessage(result.message)
      }
    })
  }

  function imageFormatter(row) {
    return <a href={ApiConfig?.uploadUrl + row?.issueImage} target="_blank" rel="noreferrer" >
      <img alt="Image not uploaded" className="table-img" src={ApiConfig?.uploadUrl + row?.issueImage} /></a>;
  }

  const columns = [
    { name: 'IssueImage', sort: true, wrap: true, selector: imageFormatter },
    { name: 'User Id', sort: true, wrap: true, selector:linkUserId },
    { name: 'Email Id', sort: true, wrap: true, selector: linkEmail },
    { name: 'Subject', sort: true, wrap: true, selector: linkSubject },
    { name: 'Status', sort: true, wrap: true, selector: linkDescription },
    { name: 'Change Status', width: '300px', wrap: true, selector: statuslinkFollow },
  ];
  const customStyles = {
    cells: {
      style: {
        cursor: 'pointer',
      },
    },
  };



  const nextPage = (row) => {
    setActiveScreen('supportmessage');
    setTicketId(row?._id)
    setEmailID(row?.emailId);
    setDescription(row?.description);
  }

  useEffect(() => {
    handleIssueList()
  }, []);

  const handleIssueList = async () => {
    LoaderHelper.loaderStatus(false);
    await AuthService.getAllTickets().then(async result => {
      if (result?.success) {
        LoaderHelper.loaderStatus(false);
        try {
          setIssueList(result?.data?.reverse());
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

    activeScreen === 'support' ?
      <>
        <div id="layoutSidenav_content">
          <main>
            <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
              <div className="container-xl px-4">
                <div className="page-header-content pt-4">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto mt-4">
                      <h1 className="page-header-title">
                        <div className="page-header-icon"><i className="fa fa-question"></i></div>
                        Support Page
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="container-xl px-4 mt-n10">
              <div className="card mb-4">
                <div class="card-header">Issue List
                  <div class="dropdown">
                    <button class="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Export </button>
                    <div class="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                      <CSVLink data={issueList} class="dropdown-item">Export as CSV</CSVLink>
                    </div>
                  </div>
                </div>
                <div className="card-body mt-3">
                  <table className="" width="100%" >
                    <DataTable columns={columns} data={issueList} pagination direction="auto" responsive subHeaderAlign="right" subHeaderWrap striped highlightOnHover fixedHeader onRowClicked={(row) => { nextPage(row) }} customStyles={customStyles} />
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
      :
      <Supportmessage id={ticketId} email={emailId} description={description} />
  )
}

export default SupportPage;


