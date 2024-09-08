import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";

const ForgetpasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
        }
    }

    const handleForgotPassword = async (email) => {
        LoaderHelper.loaderStatus(false);
        await AuthService.forgotPassword(email).then(async result => {
            if (result.message === "Password Send") {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
                    navigate('/');
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }

    return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main className="login-card">
                    <div className="container-xl px-4">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">

                                <div className="card-body p-5 text-center">
                                    <img src="/assets/img/logo-white.png" className="img-fluid" alt="" width='300' />
                                </div>
                                <div className="card">
                                    {/* <hr className="my-0" /> */}
                                    <div className="card-body p-5">
                                        <div className="h4 text-center mb-2">Forgot Password</div>
                                        <div className="text-center small text-muted mb-4">Enter your email address below and we will send your password on your Email.</div>
                                        <form action="/" >
                                            <div className="mb-3">
                                                <label className="text-gray-600 small" for="emailExample">
                                                    Your Email address
                                                </label>

                                                <input className="form-control form-control-solid" type="email" aria-label="Email Address" aria-describedby="emailExample" name="email" onChange={handleInputChange} />

                                            </div>
                                            <button className="btn btn-block w-100 btn-xl btn_admin mt-2 px-2" style={{backgroundColor:"rgb(96, 189, 111)", color:"black"}} type="button" onClick={() => handleForgotPassword(email)}> Forgot Password</button>
                                        </form>
                                    </div>
                                    {/*  <hr className="my-0" /> */}
                                    <div className="card-body ">
                                        <div className="small text-center">
                                            <Link className="btn-link text-decoration-none" to="/">Back to - Login</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ForgetpasswordPage;