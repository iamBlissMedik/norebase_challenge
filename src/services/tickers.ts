import { api } from "../constants/apiConstants";
import { returnBaseUrl } from "../utils/serviceUtils";
import Axios from "./AxiosInstance";

export const getTickersApiService = (start: number, pageLimit: number) =>
  Axios.get(returnBaseUrl(api.TICKERS, `?start=${start}&limit=${pageLimit}`));
