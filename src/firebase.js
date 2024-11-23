import { initializeApp } from "firebase/app";
// firestore를 불러오는 모듈을 임포트
import { getFirestore } from "firebase/firestore"
// gitignore로 없애야함

const firebaseConfig = {
  apiKey: "AIzaSyBdl0oYxMGWANdxYId6G3q4Go3jgUlfy8w",
  authDomain: "webframework1-4691b.firebaseapp.com",
  projectId: "webframework1-4691b",
  storageBucket: "webframework1-4691b.firebasestorage.app",
  messagingSenderId: "1002407959010",
  appId: "1:1002407959010:web:c08861f378047bddd701bb",
  measurementId: "G-EQ6FKML5Z4"
};

const app = initializeApp(firebaseConfig);
// firestore 객체 생성
const db = getFirestore(app);
// firestore export
export {db}
