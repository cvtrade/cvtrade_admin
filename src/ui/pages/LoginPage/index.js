import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../api/services/AuthService";
import { alertErrorMessage, alertSuccessMessage } from "../../../customComponent/CustomAlertMessage";
import LoaderHelper from "../../../customComponent/Loading/LoaderHelper";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('')

    const handleInputChange = (event) => {
        switch (event.target.name) {
            case "email":
                setEmail(event.target.value);
                break;
            case "otp":
                setOtp(event.target.value);
                    break;    
            case "password":
                setPassword(event.target.value);
                break;
            default:
        }
    }

    const handleLogin = async (email, otp, password) => {
        LoaderHelper.loaderStatus(true);
        await AuthService.login(email, otp, password).then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    sessionStorage.setItem("token", result.data.token);
                    sessionStorage.setItem("emailId", result.data.email_or_phone);
                    sessionStorage.setItem("userType", result.data.admin_type);
                    sessionStorage.setItem("userId", result.data.id);
                    sessionStorage.setItem("permissions", JSON.stringify(result?.data?.permissions || []));
                    alertSuccessMessage('Login Successfull!!');
                    navigate('/dashboard');
                    window.location.reload()
                } catch (error) {
                    alertErrorMessage(error);
                }
            } else {
                LoaderHelper.loaderStatus(false);
                alertErrorMessage(result.message);
            }
        });
    }

    const handleGetOtp = async(email) =>{
        LoaderHelper.loaderStatus(true);
        await AuthService.getOtp(email).then(async result => {
            if (result.success) {
                LoaderHelper.loaderStatus(false);
                try {
                    alertSuccessMessage(result.message);
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
                                    <img src="/assets/img/logo_dark.svg" className="img-fluid" alt="" width='300' />
                                </div>
                                {/* <hr className="my-0" /> */}
                                <div className="card ">
                                    <div className="card-body p-5">
                                        <h2 class=" fs-1 text-center"><strong>Sign in to account</strong></h2>
                                        <p class="text-center"><small>Enter your email &amp; password to login</small></p>
                                        <form>
                                        <div className="mb-3">
                                                <label className="text-gray-600 small" for="emailExample">Email address</label>
                                                <div className="input-group">
                                                    <input className="form-control form-control-solid" type="email" name="email" placeholder="" aria-label="Email Address" aria-describedby="emailExample" value={email} onChange={handleInputChange} />
                                                    <button type="button" 
                                                     onClick={() => { handleGetOtp(email)}}
                                                        className="btn btn-block btn-l btn_admin" style={{backgroundColor:"rgb(96, 189, 111)" , color:"white"}} >
                                                        <span> GET OTP </span>
                                                    </button>
                                                </div>

                                            </div>
                                            <label className="text-gray-600 small" for="otp">Enter the OTP</label>
                                            <input className="form-control form-control-solid" type="number" name="otp" placeholder="" aria-label="otp" aria-describedby="otpExample" onWheel={(e) => e.target.blur()}  value={otp}
                                                 onChange={handleInputChange}
                                                 />
                                            <div className="mb-3">
                                                <label className="text-gray-600 small" for="passwordExample">Password</label>
                                                <input className="form-control form-control-solid" type="password" placeholder="" aria-label="Password" name="password" aria-describedby="passwordExample" value={password} onChange={handleInputChange} />
                                            </div>
                                            <div>
                                                {/* <Link className="btn-link text-decoration-none" to="/forgotpassword">Forgot your password?</Link> */}
                                            </div>
                                            <div className="text-center py-3 mt-2">
                                                <button type="button" className="btn btn-block w-100 btn-xl btn_admin mt-2 px-5" style={{backgroundColor: "#60bd6f", fontSize:"20px ",color:"white"}}
                                                    onClick={() => handleLogin(email, otp, password)}>
                                                    Login
                                                </button>
                                            </div>
                                        </form>
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

export default LoginPage;