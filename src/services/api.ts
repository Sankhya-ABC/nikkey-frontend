import axios from "axios";
import { ROUTES } from "../routes";
import { STORAGE_KEYS } from "../utils/constants";

export const api = axios.create({
  baseURL: "http://erp.optecit.com.br:61872/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error);
  },
);
