import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import moment from "moment";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import Papa from 'papaparse';
import 'jspdf-autotable';
import DataTableBase from "../../../customComponent/DataTable";

const History = () => {
    const [data, setData] = useState([]);

    const statusAction = (row) => {
        return (
            <div className=" d-flex gap-2 " >
                {row?.status === "DISPUTE" ? <><button className="btn-success  btn btn-sm" type="button" onClick={() => statusUpdate(row?.order_id)} > Settle</button></> : "-------"
                }
            </div >
        );
    };

    const statusFormat = (row) => {
        return (
            <div className=" d-flex gap-2 " >
                {row?.status === "CONFIRMED" ? <span className=" text-success" >{row?.status}</span> : row?.status === "DISPUTE" ? <span className="text-warning font-weight-bold" >{row?.status} </span> : <span className="text-danger" >{row?.status} </span>}
            </div>
        );
    };

    const columns = [
        { name: 'Created At', selector: row => moment(row?.updatedAt).format('DD-MM-YYYY') },
        { name: "Order Id", wrap: true, selector: row => row?.order_id, },
        { name: "Posted by", wrap: true, selector: row => row?.postAd_user, },
        { name: "Trader", wrap: true, selector: row => row?.trader_id, },
        { name: "Order Type", selector: row => row.side, },
        { name: 'Price', wrap: true, selector: row => row?.amount + " " + row?.quote_short_name + " / " + row?.base_short_name },
        { name: 'Amount', wrap: true, selector: row => row?.receiving_amount + " " + row?.base_short_name },
        { name: <>Payment Method</>, selector: row => row?.payment_method[0]?.type },
        { name: 'Status', wrap: true, selector: statusFormat },
        { name: 'Action', wrap: true, selector: statusAction },
    ]

    useEffect(() => {
        handleData()
    }, []);

    const handleData = async () => {
        LoaderHelper.loaderStatus(true);
        await AuthService.all_p2p_orders().then(async result => {
            LoaderHelper.loaderStatus(false);
            if (result?.success) {
                try {
                    setData(result?.data.reverse());
                } catch (error) {
                    alertErrorMessage('No data found');
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage('No data found');
            }
        });
    }

    const statusUpdate = async (order_id) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.statusToSettle(order_id).then(async result => {
            LoaderHelper.loaderStatus(false);
            if (result?.success) {
                alertSuccessMessage("Status Updated")
                handleData()
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage('Something went wrong');
            }
        });
    }


    // *********Export Trade Data In Excel Formats ************* // 
    const exportToExcel = () => {
        const exportableData = ExportableData();
        const ws = XLSX.utils.json_to_sheet(exportableData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Trades');
        XLSX.writeFile(wb, 'Approved Kyc.xlsx');
    };


    // *********Export Trade Data In PDF Formats ************* // 
    const exportToPDF = () => {
        const exportableData = ExportableData();
        const doc = new jsPDF('landscape', 'mm', 'a4');
        doc.text('P2P', 10, 10);
        const tableData = exportableData.map(item => Object.values(item));
        const tableHeaders = Object.keys(exportableData[0]); // Get keys from the first object
        doc.autoTable({
            head: [tableHeaders],
            body: tableData,
            startY: 20,
            theme: 'grid',
        });
        doc.save('P2P.pdf');
    };

    // ********* Rearrange Exportabel Data ********* //
    const ExportableData = () => {
        const modifiedArray = data.map((item, index) => {
            const { updatedAt, user_id, __v, _id, kyc_reject_reason, kycdata, createdAt, ...rest } = item;
            const modifiedItem = {};
            for (const key in rest) {
                if (Object.hasOwnProperty.call(rest, key)) {
                    const modifiedKey = key.toUpperCase();
                    modifiedItem[modifiedKey] = rest[key];
                }
            }
            modifiedItem.CREATED_AT = moment(createdAt).format('DD/MM/YYYY hh:mm A');
            return modifiedItem;
        });
        return modifiedArray;

    }
    // *********Export Trade Data In CSV Formats ************* // 
    const exportToCSV = () => {
        const exportableData = ExportableData();
        const csv = Papa.unparse(exportableData);
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'P2P.csv';
        link.click();
    };
    const HandleExport = (exportData) => {
        if (exportData === 'EXCEL') {
            exportToExcel()
        }
        else if (exportData === 'PDF') {
            exportToPDF()
        }
        else if (exportData === 'CSV') {
            exportToCSV()
        }
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
                                        <div className="page-header-icon"> <i className="fa fa-user-check" ></i></div>
                                        P2P History
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div class="card-header"> P2P History List
                            <div class="dropdown">
                                <button class="btn btn-dark btn-sm dropdown-toggle" id="dropdownFadeInUp" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-download me-3"></i>Export</button>
                                <div class="dropdown-menu animated--fade-in-up" aria-labelledby="dropdownFadeInUp">
                                    <button type="button" onClick={() => { HandleExport('EXCEL') }} class="dropdown-item">Export as EXCEL</button>
                                    <button type="button" onClick={() => { HandleExport('CSV') }} class="dropdown-item">Export as CSV</button>
                                    <button type="button" onClick={() => { HandleExport('PDF') }} class="dropdown-item">Export as PDF</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div class="table-responsive">
                                <DataTableBase columns={columns} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default History;