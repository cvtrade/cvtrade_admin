import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import DataTableBase from "../../../customComponent/DataTable";
import { ApiConfig } from "../../../api/apiConfig/ApiConfig";

const PartnershipWithdrawal = () => {
    const [partnersList, setPartnersList] = useState([]);
    const [allData, setAllData] = useState([]);
    const [pairPrice, setPairPrice] = useState(0);


    const statuslinkFollow = (row) => {
        return (
            <div>
                {row?.status === 'PENDING' ? <>
                    <button className="btn btn-success btn-sm me-2" onClick={() => { handleFundTransfer("CVT", "BEP20", row?.to_address, (row?.amount / pairPrice)?.toFixed(4) , " ", row?._id) }}>Approve</button>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => { handleStatus(row?._id, 'REJECTED') }} >Reject</button> </>
                    : <span className={`text-${row?.status === "APPROVED" ? "success" : "danger"}`}> {row?.status} </span>}
            </div>
        );
    };


    const columns = [
        { name: 'Sr no.', selector: (row, index) => index + 1, wrap: true },
        { name: 'Date', width: "140px", sort: true, selector: row => moment(row?.createdAt).format('MMMM Do YYYY'), wrap: true },
        { name: 'Partner Id', selector: row => row?.partner_id, wrap: true },
        { name: 'Amount (CVT)', width: "120px", sort: true, wrap: true, selector: row => (row?.amount / pairPrice)?.toFixed(4) },
        { name: 'Chain', width: "120px", sort: true, wrap: true, selector: row => row?.chain },
        { name: 'Address', width: "120px", sort: true, wrap: true, selector: row => row?.to_address },
        { name: 'Action', width: "200px", selector: statuslinkFollow, wrap: true, grow: 1.5 },

    ];

    function searchObjects(e) {
        const keysToSearch = ["partner_id", "amount",];
        const userInput = e.target.value;
        const searchTerm = userInput?.toLowerCase();
        const matchingObjects = allData.filter(obj => {
            return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm));
        });
        setPartnersList(matchingObjects);
    };

    const handleFundTransfer = async (tokenName, chain, receiver, amount, email, id) => {
        LoaderHelper.loaderStatus(true)
        await AuthService.fundTransfer(tokenName, chain, receiver, amount, email).then(async result => {
            LoaderHelper.loaderStatus(false)
            if (result?.success) {
                alertSuccessMessage(result?.message)
                if (result?.data?.transaction_hash) {
                    handleStatus(id, 'APPROVED', result?.data?.transaction_hash)
                }
            } else {
                alertErrorMessage(result?.message)
            }
        })
    };

    const handleStatus = async (userId, status, transaction_hash) => {
        LoaderHelper.loaderStatus(true)
        await AuthService.partner_update_withdrawal_status(userId, status, transaction_hash).then(async result => {
            LoaderHelper.loaderStatus(false)
            if (result.success) {
                alertSuccessMessage(result.message);
                handlePartners();
            } else {
                LoaderHelper.loaderStatus(false)
                alertErrorMessage(result.message)
            }
        })
    }

    useEffect(() => {
        handlePartners()
        getPairPrice()
    }, []);

    const handlePartners = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.partnerWithdrawalRequests().then(async result => {
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

    const getPairPrice = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.pairPrice().then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                setPairPrice(result?.data?.buy_price || 0);

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

export default PartnershipWithdrawal;