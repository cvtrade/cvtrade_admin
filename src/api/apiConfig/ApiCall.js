import axios from "axios";
import { alertErrorMessage } from "../../customComponent/CustomAlertMessage";

export const ApiCallPost = async (url, parameters, headers) => {
  try {
    const response = await axios.post(url, parameters, { headers: headers });
    return response.data;
  } catch (error) {
    if (error.response.data.message === "Token is expired with message: res is not defined") {
      alertErrorMessage('Token is Expired');
      sessionStorage.clear();
      window.location.reload();
      return;
    }
    return error.response.data;
  }
};

export const ApiCallDelete = async (url, parameters, headers) => {
  try {
    const response = await axios.delete(url, parameters, { headers: headers });
    return response.data;
  } catch (error) {
    if (error.response.data.message === "Token is expired with message: res is not defined") {
      alertErrorMessage('Token is Expired');
      sessionStorage.clear();
      window.location.reload();
      return;
    }
    return error.response.data;
  }
};

export const ApiCallGet = async (url, headers) => {
  try {
    const response = await axios.get(url, { headers: headers });
    
    return response.data;

  } catch (error) {
    if (error.response.data.message === "Token is expired with message: res is not defined") {
      alertErrorMessage('Token is Expired');
      sessionStorage.clear();
      window.location.reload();
      return;
    }
    return error.response.data;
  }
};

export const ApiCallPut = async (url, parameters, headers) => {
  try {
    const response = await axios.put(url, parameters, { headers: headers });
    return response.data;
  } catch (error) {
    if (error.response.data.message === "Token is expired with message: res is not defined") {
      alertErrorMessage('Token is Expired');
      sessionStorage.clear();
      window.location.reload();
      return;
    }
    return error.response.data;
  }
};