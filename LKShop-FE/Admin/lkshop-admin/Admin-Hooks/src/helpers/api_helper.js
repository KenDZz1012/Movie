import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import { Toast } from "reactstrap";
import { message } from "antd";

//pass new generated access token here
const token = accessToken;

//apply base url for axios
const API_URL = "";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data).catch(err=>{
     message.warning(err?.response?.data?.message)
    });
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data).catch(err=>{
      message.warning(err?.response?.data?.message)
     });
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data).catch(err=>{
      message.warning(err?.response?.data?.message)
     });
}

export async function postWithFormData(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then(response => response.data).catch(err=>{
      message.warning(err?.response?.data?.message)
     });;
}

export async function putWithFormData(url, data, config = {}) {
  return axiosApi
    .put(url, data, { ...config })
    .then(response => response.data).catch(err=>{
      message.warning(err?.response?.data?.message)
     });;
}

