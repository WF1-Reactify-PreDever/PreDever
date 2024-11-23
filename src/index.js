import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from './sjy_profile/store';  // Redux store import
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter import
import reportWebVitals from "./reportWebVitals";
import './index.css'; // 스타일 파일

// 'root' 요소 가져오기
const container = document.getElementById("root");

// React 18 방식으로 루트 생성
const root = ReactDOM.createRoot(container);

// 렌더링: 리덕스 Provider와 React Router 둘 다 적용
root.render(
  <Provider store={store}>  {/* Redux Provider로 App을 감싸기 */}
    <BrowserRouter>  {/* 라우터로 App을 감싸기 */}
      <App />
    </BrowserRouter>
  </Provider>
);

// Optional: 성능 측정
reportWebVitals();
