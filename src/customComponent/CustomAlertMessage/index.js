import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function alertErrorMessage(message) {
  toast.error(message ? message?.toUpperCase() :'Network Error...Please try again later', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    closeButton: false,
  });

}

function alertSuccessMessage(message) {
    toast.success(message ? message?.toUpperCase() : 'Success', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      closeButton: false
    });
  
}

function alertWarningMessage(message) {
  toast.info(message ? message?.toUpperCase() :'Oops...Something went wrong', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })};





export { alertErrorMessage, alertSuccessMessage, alertWarningMessage };