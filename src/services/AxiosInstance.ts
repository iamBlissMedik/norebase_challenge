import axios, { AxiosError } from "axios";
import { getBaseUrl } from "../utils/globalUtils";

const AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

AxiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
