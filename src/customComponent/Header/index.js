import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Header = ({isSidebar, setIsSidebar}) => {
    const emailId = sessionStorage.getItem('emailId');
    const Navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/'; 
    }


    const sidebar = () =>{
        setIsSidebar(!isSidebar)
    }

    useEffect(()=>{
     if(!isSidebar){
        document.body.classList.add('sidenav-toggled');
        document.body.classList.remove('sidenav-toggled-m')
     } else{
        document.body.classList.remove('sidenav-toggled');
        document.body.classList.add('sidenav-toggled-m')
     }
    },[isSidebar])


    return (
        <>
            <nav className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white" id="sidenavAccordion">
                <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle" onClick={sidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
                <a className="navbar-brand pe-3 ps-4 ps-lg-3" href="/dashboard">
                    <img src="/assets/img/favicon.png" className="img-fluid" alt="" />
                </a>
                <ul className="navbar-nav align-items-center ms-auto">
                    {/*  <li className="nav-item dropdown no-caret d-none d-sm-block me-3 dropdown-notifications">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-bell"></i></a>
                        <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <i className="me-2" data-feather="bell"></i>
                                Alerts Center
                            </h6>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-info"><i data-feather="bar-chart"></i></div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 22, 2021</div>
                                    <div className="dropdown-notifications-item-content-text">A new monthly report is ready. Click here to view!</div>
                                </div>
                            </a>

                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-danger"><i className="fas fa-exclamation-triangle"></i></div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 8, 2021</div>
                                    <div className="dropdown-notifications-item-content-text">Critical system failure, systems shutting down.</div>
                                </div>
                            </a>

                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-success"><i data-feather="user-plus"></i></div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 2, 2021</div>
                                    <div className="dropdown-notifications-item-content-text">New user request. Woody has requested access to the organization.</div>
                                </div>
                            </a>
                        </div>
                    </li>
 */}
                    <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="img-fluid" src="/assets/img/dummy.png" alt="" /></a>
                        <div className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                            <h6 className="dropdown-header d-flex align-items-center">
                                <img className="dropdown-user-img" src="/assets/img/dummy.png" alt="" />
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name" style={{ textAlign: 'center' }}></div>
                                    <div className="dropdown-user-details-email" style={{ paddingTop: '8px' }}>{emailId}</div>
                                </div>
                            </h6>
                            <button type="button" className="dropdown-item justify-content-center" onClick={()=>Navigate("myLogs")} style={{ justifycontent: "center" }}>
                             My Activity logs
                            </button>
                            <button type="button" className="dropdown-item justify-content-center" onClick={handleLogout} style={{ justifycontent: "center" }}>
                                logout
                                <div className="dropdown-item-icon ms-2"><i className="fa fa-power-off"></i></div>

                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default Header;