import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer position={toast.POSITION.TOP_RIGHT} autoClose={3000} />
    <App />
  </React.StrictMode>
);
