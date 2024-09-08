
import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";
import { CSVLink } from "react-csv";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import moment from "moment";
import DataTableBase from "../../../customComponent/DataTable";
import ReactPaginate from "react-paginate";


const FundsPendingDeposit = () => {
    const [fundsDeposit, setFundsDeposit] = useState([]);
    const [allData, setAllData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [totalData,setTotalData] = useState()


//   const handlePageChange = ({ selected }) => {
//       setCurrentPage(selected + 1);
//   };


//   const pageCount = totalData/itemsPerPage

//   const skip = (currentPage - 1) * itemsPerPage;

    function statusFormatter(row) {
        return <button className={`btn btn-success btn-sm   me-2`} style={{ cursor: 'default' }}>{row.status}</button>
    };

    const columns = [
        { name: "Date", selector: row => moment(row?.createdAt).format("MMM Do YYYY"), wrap: true },
        { name: "Chain", selector: row => row.chain, },
        { name: "Currency", wrap: true, selector: row => row.currency, },
        { name: "Email", wrap: true, selector: row => row.emailId, },
        { name: <div style={{whiteSpace:"revert"}}>Mobile Number</div>, selector: row => row?.mobileNumber, wrap: true },
        { name: "Name", wrap: true, selector: row => row.firstName + row.lastName, },
        { name: <div style={{whiteSpace:"revert"}}>From Address</div>, wrap: true, selector: row => row.from_address, },
        { name: <div style={{whiteSpace:"revert"}}>To Wallet Address</div>, wrap: true, selector: row => row.to_address, },
        { name:<div style={{whiteSpace:"revert"}}>Transaction Hash</div>, wrap: true, selector: row => row.transaction_hash, },
        { name: "Amount", wrap: true, selector: row => row.amount, },
        { name: "Status", selector: statusFormatter, },
    ];

    useEffect(() => {
        handleFundDeposit()
    }, []);

    const handleFundDeposit = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.completePendingRequest().then(async result => {
            LoaderHelper.loaderStatus(false);
            if (result.success) {
                try {
                    setFundsDeposit(result.data);
                    // setTotalData(result?.totalCount)
                    setAllData(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
            }
        });
    };

    function handleSearch(e) {
        const keysToSearch = ["chain", "currency", "emailId", "firstName", "from_address", "to_address", "transaction_hash", "amount", "mobileNumber"];
        const searchTerm = e.target.value?.toLowerCase();
        const matchingObjects = allData.filter(obj => { return keysToSearch.some(key => obj[key]?.toString()?.toLowerCase()?.includes(searchTerm)) });
        setFundsDeposit(matchingObjects);
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
                                        <div className="page-header-icon"><i className="fa fa-dollar-sign"></i></div>
                                        Pending Deposit
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">
                            Pending Deposit
                            <div className="col-5">
                                <input className="form-control form-control-solid" id="inputLastName" type="text" placeholder="Search here..." name="search" onChange={handleSearch} />
                            </div>
                            {fundsDeposit.length === 0 ? "" :
                            <div className="dropdown">
                                <button className="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Export{" "}
                                </button>
                                <div className="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                    <CSVLink data={fundsDeposit} className="dropdown-item">Export as CSV</CSVLink>
                                </div>
                            </div>}
                        </div>
                        <div className="table-responsive" width="100%">
                            <DataTableBase columns={columns} data={fundsDeposit} />
                        </div>
                        {/* {totalData > 5 ? <ReactPaginate
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName={'customPagination'}
                            activeClassName={'active'}
                        /> : ""} */}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default FundsPendingDeposit;