import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import DescriptionAlerts from "./components/notification-center";
import axios from "axios";
import getCookie from "./components/getcookie";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  // 로그인 페이지와 회원가입 페이지에서는 CSRF 토큰 검증을 진행하지 않음
  if (config.url !== '/login' && config.url !== '/create-account') {
    const csrftoken = getCookie('csrftoken');
    config.headers['X-CSRFToken'] = csrftoken;
  }
  return config;
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={3000} />
    <DescriptionAlerts />
    <App />
  </React.StrictMode>
);
