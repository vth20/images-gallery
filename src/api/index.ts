import { Modal } from "antd";
import axios from "axios";

const API_BASE_URL = process.env.URL_API;
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      Modal.error({
        title: "Error 401",
        onOk: () => {
          // close();
        },
      });
    }
    // error common
    if (error?.response?.status === 403) {
      Modal.error({
        title: "Error 403",
        onOk: () => {
          // close();
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
