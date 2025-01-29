import axios from "axios";
import { baseUrl } from "@Constants/Shared/index";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

export default axiosInstance;
