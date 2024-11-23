import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

// 페이지 및 모달 import
import SignUp from "./jsw/page/SignUp";
import Dummy from './jsw/page/Dummy';
import LoginModal from './jsw/modal/LoginModal';

// 프로필 및 포트폴리오 관련 import
import Home from "./sjy_profile/page/HomePage";
import PortfolioPage from "./sjy_profile/page/PortfolioPage";
import ProfilePage from "./sjy_profile/page/ProfilePage";

// Firebase 관련 import
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

// 데이터 불러올꺼면 docSnap.data()로 컬렉션 전부를 불러올 수 있고 필드 불러오려면 docSnap.data().name 이런식으로 불러와야함

// const [test, setTest] = useState()
  // // async - await로 데이터 fetch 대기
  // async function getTest() {
  //   // document에 대한 참조 생성
  //   const docRef = doc(db, "items", "1");
  //   // 참조에 대한 Snapshot 쿼리
  //   const docSnap = await getDoc(docRef);
  //   console.log(docSnap.data().name)
  //   if (docSnap.exists()) {
  //     setTest(docSnap.data()) -> test에 db 값 저장
  //   }
  // };

function App() {

  return (
    <Router>
      <Routes>
        {/* 기본 페이지들 */}
        <Route path='/' element={<Dummy />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path='/loginmodal' element={<LoginModal />} />

        {/* 프로필 및 포트폴리오 관련 페이지들 */}
        <Route path='/home' element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
