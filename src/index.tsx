import "./storefront/base.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(<StrictMode><App /></StrictMode>);
}
