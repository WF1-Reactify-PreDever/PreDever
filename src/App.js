// src/App.js

import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// 페이지 및 모달 import
import SignUp from "./jsw/page/SignUp";
import Dummy from './jsw/page/Dummy';
import LoginModal from './jsw/modal/LoginModal';

// 프로필 및 포트폴리오 관련 import
import Homepage from "./Home/Pages/HomePage";
import ProfilePage from "./sjy_profile/pages/ProfilePage";
import PostDetail from './ssy/PostDetail';

// 글 작성 페이지 import
import WritePortfolio from './sjy_profile/pages/WritePortfolio';
import WritePost from './sjy_profile/pages/WritePost';

// Firebase 관련 import
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        {/* 루트 경로: HomePage를 렌더링 */}
        <Route path="/" element={<Homepage />} />
        
        {/* 로그인 경로 */}
        <Route path="/loginmodal" element={<LoginModal />} />
        
        {/* 회원가입 경로 */}
        <Route path="/signUp" element={<SignUp />} />

        {/* 프로필 페이지 경로 */}
        <Route path="/profile/:username" element={<ProfilePage />} />

        {/* 게시물 상세 경로 */}
        <Route path="/postdetail" element={<PostDetail />} />
        
        {/* 게시물 작성 페이지 */}
        <Route path="/write-portfolio" element={<WritePortfolio />} />
        <Route path="/write-post" element={<WritePost />} />
      </Routes>
    </DndProvider>
  );
}

export default App;
