import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Dummy from './jsw/page/Dummy';
import HomePage from "./Home/Pages/HomePage"; // HomePage 컴포넌트 경로
import LoginModal from './jsw/modal/LoginModal'; // 로그인 화면 컴포넌트
import SignUp from "./jsw/page/SignUp"; // 회원가입 화면 컴포넌트
import PostDetail from './ssy/PostDetail';

// 데이터 불러올꺼면 docSnap.data()로 컬렉션 전부를 불러올 수 있고 필드 불러오려면 docSnap.data().name 이런식으로 불러와야함

// const [test, setTest] = useState()
  // // async - await로 데이터 fetch 대기
  // async function getTest() {
  //   / document에 대한 참조 생성
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
      {/* 루트 경로: HomePage를 렌더링 */}
      <Route path="/" element={<HomePage />} />
      
      {/* 로그인 경로 */}
      <Route path="/loginmodal" element={<LoginModal />} />
      
      {/* 회원가입 경로 */}
      <Route path="/signUp" element={<SignUp />} />

      <Route path="/postdetail" element={<PostDetail/>} />
      
    </Routes>
  );
}

export default App;
