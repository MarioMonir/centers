import axios from "axios";
import config from "../config";

// -----------------------------------------------------------

const request = axios.create({
  baseURL: config.baseUrl,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------------------------------------

request.interceptors.request.use(async (config) => {
  // const token = localStorage.getItem("accessToken");
  //   if (token) config.headers["Authorization"] = "Bearer " + token;
  return config;
});

// -----------------------------------------------------------

export default request;
