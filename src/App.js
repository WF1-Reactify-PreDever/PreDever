import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Dummy from './jsw/page/Dummy';
import HomePage from "./Home/Pages/HomePage"; // HomePage 컴포넌트 경로
import LoginModal from './jsw/modal/LoginModal'; // 로그인 화면 컴포넌트
import SignUp from "./jsw/page/SignUp"; // 회원가입 화면 컴포넌트

function App() {
  return (
    <Routes>
      {/* 루트 경로: HomePage를 렌더링 */}
      <Route path="/" element={<HomePage />} />
      
      {/* 로그인 경로 */}
      <Route path="/loginmodal" element={<LoginModal />} />
      
      {/* 회원가입 경로 */}
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
