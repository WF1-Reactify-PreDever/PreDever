import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter import
import reportWebVitals from "./reportWebVitals";
import './index.css'; // 스타일 파일

// 'root' 요소 가져오기
const container = document.getElementById("root");

// React 18 방식으로 루트 생성
const root = ReactDOM.createRoot(container);

// 렌더링: React Router만 적용
root.render(
  <BrowserRouter>  {/* 라우터로 App을 감싸기 */}
    <App />
  </BrowserRouter>
);

// Optional: 성능 측정
reportWebVitals();
