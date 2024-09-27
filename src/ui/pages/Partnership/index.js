import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";

const Partnership = () => {
    const [partnersList, setPartnersList] = useState([]);
    const [allData, setAllData] = useState([]);



    const statuslinkFollow = (row) => {
        return (
            <div>
                {row?.admin_apporval === 'PENDING' ? <>
                    <button className="btn btn-success btn-sm me-2" onClick={() => { handleStatus(row?._id, 'APPROVED') }}>Approve</button>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => { handleStatus(row?._id, 'REJECTED') }} >Reject</button> </>
                    : <span className={`text-${row?.admin_apporval === "APPROVED" ? "success" : "danger"}`}> {row?.admin_apporval} </span>}
            </div>
        );
    };

    function imageFormatter(row) {
        return (
            <a href={ApiConfig?.appUrl + row?.transactionImage} target="_blank" rel="noreferrer"  > <img style={{ width: "40%", height: "auto" }} className="table-img" src={ApiConfig?.appUrl + row?.transactionImage} alt="images" /></a>
        );
    };


    const columns = [
        { name: 'Sr no.', selector: (row, index) => index + 1, wrap: true },
        { name: 'Registration Date', width: "140px", sort: true, selector: row => moment(row?.createdAt).format('MMMM Do YYYY'), wrap: true },
        { name: 'Name', selector: row => row?.userName, wrap: true },
        { name: 'Email', width: "100px", sort: true, wrap: true, selector: row => row?.email },
        { name: 'Partnership Id', width: "120px", sort: true, wrap: true, selector: row => row?.PartnershipId },
        { name: 'Transaction Id', width: "120px", sort: true, wrap: true, selector: row => <a href={`https://bscscan.com/tx/${row?.transactionId}`} target="_blank" rel="noreferrer">{row?.transactionId} </a> },
        { name: 'Reffered By', width: "120px", sort: true, wrap: true, selector: row => row?.reffered_by || "---" },
        { name: 'Mobile Number', width: "120px", selector: row => row?.phoneNumber, wrap: true },
        { name: "Image", selector: imageFormatter, },
        { name: 'Status', sort: true, selector: row => row?.status, },
        { name: 'Action', width: "200px", selector: statuslinkFollow, wrap: true, grow: 1.5 },

    ];

    function searchObjects(e) {
        const keysToSearch = ["userName", "email", "phoneNumber", "PartnershipId", "transactionId", "reffered_by"];
        const userInput = e.target.value;
        const searchTerm = userInput?.toLowerCase();
        const matchingObjects = allData.filter(obj => {
            return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm));
        });
        setPartnersList(matchingObjects);
    };

    const handleStatus = async (userId, status) => {
        await AuthService.PartnersStatus(userId, status).then(async result => {
            if (result.success) {
                alertSuccessMessage(result.message);
                handlePartners();
            } else {
                alertErrorMessage(result.message)
            }
        })
    }

    useEffect(() => {
        handlePartners()
    }, []);

    const handlePartners = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.getPartnersList().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    setPartnersList(result.data.reverse());
                    setAllData(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
            }
        });
    }

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
                                            <div className="page-header-icon"><i className="far fa-user"></i></div>
                                            Partners List
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between">Partners Details
                                <div className="col-5">
                                    <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={searchObjects} />
                                </div>
                            </div>
                            <div className="card-body mt-3">
                                {partnersList.length === 0 ? <h6 className="ifnoData"><img alt="" src="assets/img/no-data.png" /> <br />No Data Available</h6> :
                                    <div className="table-responsive" width="100%">
                                        <DataTableBase columns={columns} data={partnersList} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Partnership;