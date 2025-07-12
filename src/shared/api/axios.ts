import axios from "axios";

import { ROUTES_WITHOUT_AUTH } from "@/shared/constants/routerPaths";

import { ENDPOINTS } from "./endpoints";

export const BASE_URL = "/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._isRetry &&
      !ROUTES_WITHOUT_AUTH.includes(
        window.location.pathname as (typeof ROUTES_WITHOUT_AUTH)[number],
      )
    ) {
      originalRequest._isRetry = true;

      if ([ENDPOINTS.LOGIN, ENDPOINTS.REFRESH].includes(error.config.url)) {
        return Promise.reject(error);
      }

      if (!refreshPromise) {
        refreshPromise = apiClient.post(ENDPOINTS.REFRESH);
      }

      try {
        await refreshPromise;
      } finally {
        refreshPromise = null;
      }

      return apiClient.request(originalRequest);
    }

    return Promise.reject(error);
  },
);
