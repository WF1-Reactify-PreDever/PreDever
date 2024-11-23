import './App.css';
import SignUp from "./jsw/page/SignUp";
import { db } from './firebase';
import { useEffect, useState } from 'react';
// firestore의 메서드 import
import { doc, getDoc } from 'firebase/firestore';
// getDoc는 문서이름을 랜덤으로 생성해서 저장
// setDoc는 문서이름을 지정해서 저장 가능
import {
  Routes,
  Route
} from "react-router-dom";
import LoginModal from './jsw/modal/LoginModal';
import Dummy from './jsw/page/Dummy';

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
    <Routes>
      <Route path='/' element={<Dummy />}/>
      <Route path="/signUp" element={<SignUp />} />
      <Route path='/loginmodal' element={<LoginModal/>} />
    </Routes>
  );
  
}

export default App;
