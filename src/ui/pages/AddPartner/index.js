
import React, { useEffect, useState } from "react";
import AuthService from "../../../api/services/AuthService";
import { alertSuccessMessage, alertErrorMessage } from "../../../customComponent/CustomAlertMessage";

const AddPartner = () => {
    const [formData, setFormData] = useState({ userName: '', email: "", password: "", phone: "", countryCode: "+91", transactionId: " ", ReferredBy: "", ReferredUserName: "" });
    const [loader, setLoader] = useState(false);
    console.log("🚀 ~ AddPartner ~ formData:", formData)


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const resetInputChange = () => {
        setFormData({ userName: '', email: "", password: "", phone: "", countryCode: "+91", transactionId: " ", ReferredBy: "", ReferredUserName: "" })
    };

    const addPartner = async () => {

        if (formData?.ReferredBy && !formData?.ReferredUserName) {
            alertErrorMessage('Invalid Referred User ID');
            return;
        }
        if (!formData?.transactionId) {
            alertErrorMessage('Please Enter Transaction ID');
            return;
        } if (!formData?.userName) {
            alertErrorMessage('Please Enter Full Name');
            return;
        } if (!formData?.phone) {
            alertErrorMessage('Please Enter Contact Number');
            return;
        } if (!formData?.email) {
            alertErrorMessage('Please Enter Email Address');
            return;
        } if (!formData?.password) {
            alertErrorMessage('Please Enter Password');
            return;
        }

        var formDatas = new FormData();
        formDatas.append("email", formData?.email);
        formDatas.append("password", formData?.password);
        formDatas.append("userName", formData?.userName);
        formDatas.append("phoneNumber", formData?.phone);
        formDatas.append("country_code", formData?.countryCode);
        formDatas.append("transactionId", formData?.transactionId)
        formDatas.append("reffered_by", formData?.ReferredBy)
        formDatas.append("transactionImage", "")
        await AuthService.createPartner(formDatas).then(async result => {
            if (result.success) {
                try {
                    alertSuccessMessage(result.message);
                    resetInputChange();
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                alertErrorMessage(result.message);
            }
        })
    };

    const getReferredUserData = async () => {
        try {
            const result = await AuthService.getReferredUserData(formData?.ReferredBy)
            if (result?.status) {
                setFormData({ ...formData, ReferredUserName: result?.name })
            } else {
                setFormData({ ...formData, ReferredUserName: "" })
            }
        } catch (error) {
            setFormData({ ...formData, ReferredUserName: "" })
            alertErrorMessage(error?.message)
        }
        finally { setLoader(false) }
    }
    useEffect(() => {
        let timeout; // Declare the timeout variable here

        if (formData?.ReferredBy) {
            setLoader(true)
            timeout = setTimeout(() => {
                getReferredUserData();
            }, 1500);
        }

        return () => clearTimeout(timeout); // Cleanup the timeout on unmount or dependency change
    }, [formData?.ReferredBy]);
    return (
        <div id="layoutSidenav_content">
            <main>
                <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                    <div className="container-xl px-4">
                        <div className="page-header-content pt-4">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-auto mt-4">
                                    <h1 className="page-header-title">
                                        <div className="page-header-icon"><i className="far fa-user"></i></div>
                                        Add Partner
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container-xl px-4 mt-n10">
                    <div className="card mb-4">
                        <div className="card-header">Enter Partner Details</div>
                        <div className="card-body">
                            <form>
                                <div className="row gx-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputFirstName">User Name <em>*</em></label>
                                        <input type="text" className="form-control  form-control-solid" id="inputFirstName" name="userName" value={formData?.userName} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLastNames">Email<em>*</em> </label>
                                        <input className="form-control form-control-solid" id="inputLastNames" type="text" name="email" value={formData?.email} onChange={handleInputChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputEmailAddress">Password<em>*</em></label>
                                        <input className="form-control form-control-solid" id="inputEmailAddress" name="password" value={formData?.password} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Phone Number<em>*</em></label>
                                        <input className="form-control form-control-solid" type="text" name="phone" value={formData?.phone} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Referred By</label>
                                        <input className="form-control form-control-solid" type="text" name="ReferredBy" value={formData?.ReferredBy} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="small mb-1" for="inputLocation">Referred User Name {loader && <><div class="spinner-border text-success" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div> </>}</label>
                                        <input className="form-control form-control-solid" type="text" name="ReferredUserName" disabled value={(formData?.ReferredBy && formData?.ReferredUserName) ? formData?.ReferredUserName : (formData?.ReferredBy && !formData?.ReferredUserName) ? "Invalid Code" : " "} />
                                    </div>
                                </div>
                                <button className="btn btn-indigo" type="button" onClick={addPartner}>Create Partner </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddPartner;