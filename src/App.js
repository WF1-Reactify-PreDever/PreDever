import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// 페이지 및 모달 import
import SignUp from "./jsw/page/SignUp";
import Dummy from './jsw/page/Dummy';
import LoginModal from './jsw/modal/LoginModal';

// 프로필 및 포트폴리오 관련 import
import Homepage from "./Home/Pages/HomePage";
import PortfolioPage from "./sjy_profile/page/PortfolioPage";
import ProfilePage from "./sjy_profile/page/ProfilePage";
import PostDetail from './ssy/PostDetail';
import PostEditorPage from './ssy/PostEditorPage';
// Firebase 관련 import
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function App() {

  return (
    <Routes>
      {/* 루트 경로: HomePage를 렌더링 */}
      <Route path="/" element={<Homepage />} />

      {/* 로그인 경로 */}
      <Route path="/loginmodal" element={<LoginModal />} />

      {/* 회원가입 경로 */}
      <Route path="/signUp" element={<SignUp />} />

      <Route path="/postdetail" element={<PostDetail />} />

      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/posteditor" element={<PostEditorPage />} />
    </Routes>
  );
}

export default App;
