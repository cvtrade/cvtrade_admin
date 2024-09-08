import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage } from "../../../customComponent/CustomAlertMessage";

const HomePage = () => {
    const userType = sessionStorage.getItem('userType');
    const Navigate = useNavigate()
    const myPermission = sessionStorage.getItem('permissions');
    let permissions = Array.isArray(JSON.parse(myPermission)) ? JSON.parse(myPermission)?.map(x => x.value) : [];
    const [totalUser, setTotalUser] = useState("");
    const [totalVerified, setTotalVerified] = useState("");
    const [totalPending, setTotalPending] = useState("");
    const [registration, setRegistration] = useState("");
    const [actived, setActived] = useState('')



    useEffect(() => {
        totaluserData();
        totalVerifiedUser();
        totalPendingUser();
        NewRegistrations();
    }, []);



    const totaluserData = async () => {
        await AuthService.getTotaluser().then(async result => {
            if (result) {
                try {
                    setTotalUser(result.data);
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result);
            }
        })
    }

    const totalVerifiedUser = async () => {
        await AuthService.getTotalVerified().then(async result => {
            if (result) {
                try {
                    setTotalVerified(result.data);
                } catch (error) {

                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result);
            }
        })
    }

    const totalPendingUser = async () => {
        await AuthService.getTotalPending().then(async result => {
            if (result) {
                try {
                    setTotalPending(result.data);
                } catch (error) {
                    alertErrorMessage(error)
                }
            } else {
                alertErrorMessage("Fail TotalPanding");
            }
        })
    }
    const NewRegistrations = async () => {
        await AuthService.getTotalRegistrations().then(async result => {
            if (result) {
                try {
                    setRegistration(result.data);
                } catch (error) {
                    alertErrorMessage(error)
                }
            } else {
                alertErrorMessage("Fail TotalPanding");
            }
        })
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
                                            <div className="page-header-icon"><i className="fa fa-th" ></i></div>
                                            Dashboard
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-xl px-4 mt-n10">
                        <div className="row">

                            {permissions.includes(1) || userType === '1' ?

                                <div className="col-lg-6 col-xl-4 mb-4">
                                    <div className="card bg-primary text-white h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="me-3">
                                                    <div className="text-white-75">Total Users</div>
                                                    <div className="display-4 fw-bold">{totalUser === undefined ? "0" : totalUser}</div>
                                                </div>
                                                <i className="feather-xl text-white-50 fa fa-user-friends"></i>
                                            </div>
                                        </div>

                                        <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <div style={{ cursor: 'pointer' }} onClick={() => {setActived('tradelist'); Navigate("/dashboard/tradelist")}}
                                            className={`text-white nav-link collapsed ${actived?.includes('tradelist') || actived === "tradelist"  ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseTraders" aria-expanded="false" aria-controls="collapseTraders"
                                            >View All</div>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }

                            {permissions.includes(2) || userType === '1' ?
                                <>
                                    <div className="col-lg-6 col-xl-4 mb-4">
                                        <div className="card bg-success text-white h-100">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="me-3">
                                                        <div className="text-white-75">Total Verified Users</div>
                                                        <div className="display-4 fw-bold">{totalVerified}</div>
                                                    </div>
                                                    <i className="feather-xl text-white-50 fa fa-user-check"></i>
                                                </div>
                                            </div>

                                            <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <div style={{ cursor: 'pointer' }} onClick={() => {setActived('approvedkyc'); Navigate("/dashboard/approvedkyc")}}
                                            className={`text-white nav-link collapsed ${actived?.includes('approvedkyc') || actived === "approvedkyc"  ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseKyc" aria-expanded="false" aria-controls="collapseKyc"
                                            >View All</div>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-xl-4 mb-4">
                                        <div className="card bg-danger text-white h-100">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="me-3">
                                                        <div className="text-white-75 ">Total Pending Kyc's</div>
                                                        <div className="display-4 fw-bold">{totalPending === undefined ? "0" : totalPending}</div>
                                                    </div>
                                                    <i className="feather-xl text-white-50 fa fa-user-slash "></i>
                                                </div>
                                            </div>
                                             <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <div style={{ cursor: 'pointer' }} onClick={() => {setActived('pendingkyc'); Navigate("/dashboard/pendingkyc")}}
                                            className={`text-white nav-link collapsed ${actived?.includes('pendingkyc') || actived === "pendingkyc"  ? 'active' : ''}`} data-bs-toggle="collapse" data-bs-target="#collapseKyc" aria-expanded="false" aria-controls="collapseKyc"
                                            >View All</div>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                        </div>
                                    </div>
                                </>
                                : null
                            }

                        </div>

                        <div className="row">
                            {userType === '1' ?
                                    <div className="col-lg-6 col-xl-4 mb-4">
                                        <div className="card bg-dark text-white h-100">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="me-3">
                                                        <div className="text-white-75 ">Today's New Registrations</div>
                                                        <div className="display-4 fw-bold">{registration?.length}</div>
                                                    </div>
                                                    <i className="feather-xl text-white-50 fa fa-user-plus"></i>
                                                </div>
                                            </div>
                                            <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <Link className="text-white stretched-link" to="/dashboard/todayRegistration" style={{ cursor: 'pointer' }} >View All</Link>
                                                <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                                }


                            {/* <div className="col-lg-6 col-xl-4 mb-4">
                                    <div className="card bg-secondary text-white h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="me-3">
                                                    <div className="text-white-75 ">Today's Deposit Request</div>
                                                    <div className="display-4 fw-bold">{toDayDepositRequest}</div>
                                                </div>
                                                <i className="feather-xl text-white-50 fa fa-wallet"></i>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("toDayDeposit")}>View All</Link>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>*/}
                            {/* <div className="col-lg-6 col-xl-4 mb-4">
                                    <div className="card bg-warning text-white h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="me-3">
                                                    <div className="text-white-75 ">Today's Withdrawal Request</div>
                                                    <div className="display-4 fw-bold">{todayWithdrawal}</div>
                                                </div>
                                                <i className="feather-xl text-white-50 fa fa-wallet "></i>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("todayWithdrawl")}>View All</Link>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div> */}


                            {/* {permissions.includes(9) || userType === '1' ?
                                    <>
                                        <div className="col-lg-6 col-xl-4 mb-4">
                                            <div className="card bg-danger text-white h-100">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="me-3">
                                                            <div className="text-white-75 ">Total Fiat Withdrawl Request</div>
                                                            <div className="display-4 fw-bold">{totalWithdraw}</div>
                                                        </div>
                                                        <i className="feather-xl text-white-50 fa fa fa-wallet"></i>
                                                    </div>
                                                </div>
                                                <div className="card-footer d-flex align-items-center justify-content-between small">
                                                    <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("totalWithdraw")}>View All</Link>
                                                    <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-xl-4 mb-4">
                                            <div className="card bg-info text-white h-100">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="me-3">
                                                            <div className="text-white-75 ">Total Fiat Deposit Request</div>
                                                            <div className="display-4 fw-bold">{totalDeposit}</div>
                                                        </div>
                                                        <i className="feather-xl text-white-50 fa fa fa-wallet"></i>
                                                    </div>
                                                </div>
                                                <div className="card-footer d-flex align-items-center justify-content-between small">
                                                    <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("totalDeposit")}>View All</Link>
                                                    <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    : null
                                } */}

                            {/*                                 <div className="col-lg-6 col-xl-4 mb-4">
                                    <div className="card bg-gradient-primary-to-secondary text-white h-100">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="me-3">
                                                    <div className="text-white-75 ">Suport</div>
                                                    <div className="display-4 fw-bold">{totalSupport}</div>
                                                </div>
                                                <i className="feather-xl text-white-50 fas fa-headset "></i>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex align-items-center justify-content-between small">
                                            <Link className="text-white stretched-link" to="" style={{ cursor: 'pointer' }} onClick={() => setActiveScreen("supportpage")}>View All</Link>
                                            <div className="text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div> */}

                        </div>
                    </div>
                </main>
            </div >
        </>
    )
}
export default HomePage;