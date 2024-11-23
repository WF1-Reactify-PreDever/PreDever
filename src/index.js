import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter import
import reportWebVitals from "./reportWebVitals";
import './index.css'; // 스타일 파일

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Optional: 성능 측정
reportWebVitals();
