import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';  // 리덕스 스토어 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* 리덕스 스토어를 앱에 제공 */}
      <App />
    </Provider>
  </React.StrictMode>
);

// 성능 측정을 원하시면 reportWebVitals 함수에 전달
reportWebVitals();
