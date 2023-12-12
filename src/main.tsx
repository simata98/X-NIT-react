import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";
import DescriptionAlerts from "./components/notification-center";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={3000} />
    <DescriptionAlerts />
    <App />
  </React.StrictMode>
);
