import React, { useState } from "react"; // useState import
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, setDoc, addDoc, doc, getDoc } from "firebase/firestore";
import styles from "../css/LoginModal.module.css"; // CSS 모듈 import

const LoginModal = (props) => {
  Modal.setAppElement("#root");
  const navigate = useNavigate();
  const [email, setEmail] = useState("null");
  const [loginFlag, setLoginFlag] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const moveToSignUp = () => {
    navigate("/signUp");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    // console.log(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    // console.log(e.target.value);
  };

  // 이미 이메일이 있는지 확인하는 함수
  const checkEmail = async (email) => {
    const docRef = doc(db, "userDetail", email); // 이메일을 문서 ID로 사용
    const docSnap = await getDoc(docRef); // 문서 가져오기
    console.log(docSnap.exists());
    return docSnap.exists(); // 문서가 존재하면 true, 아니면 false 반환
  };

  const handleLoginClick = async () => {
    if (loginFlag) {
      login();
    } else {
      if (await checkEmail(email)) {
        // console.log("check통과");
        // 로그인 버튼 클릭 시 비밀번호 입력 필드 표시
        setShowPasswordInput(true);
        setLoginFlag(true);
      } else {
        alert("존재하지 않는 이메일입니다. 다시 한번 확인해주세요.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowPasswordInput(false); // 모달 닫을 때 비밀번호 입력 필드 숨김
    setLoginFlag(false);
    props.onRequestClose(); // 원래의 모달 닫기 함수 호출
  };

  const login = async () => {
    const docRef = doc(db, "userDetail", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data(); // 문서의 데이터 가져오기
      const id = userData.id;
      // console.log(userData); // 데이터 출력
      if (password !== userData.password) {
        alert("비밀번호가 틀립니다.");
        return;
      } else {
        navigate("/", { state: { id, email } });
        props.onRequestClose(); // 원래의 모달 닫기 함수 호출
        setLoginFlag(true);
      }
      // 필요에 따라 추가 작업 수행
    } else {
      alert("이메일이 존재하지 않습니다.");
    }
  };

  return (
    <Modal
      className={styles["main-container"]}
      isOpen={props.isOpen}
      onRequestClose={handleCloseModal}
    >
      <div className={styles["image-frame"]}>
        <div className={styles["hanseongdae-gyopyo"]} />
      </div>
      <div className={styles["flex-column-e"]}>
        <div className={styles.login}>
          <div className={styles.frame}>
            <span className={styles["login-1"]}>로그인</span>
          </div>
          <div className={styles["frame-2"]}>
            <div className={styles["frame-3"]}>
              <div className={styles["frame-4"]}>
                <input
                  className={styles["frame-input"]}
                  placeholder="이메일을 입력하세요."
                  onChange={handleEmail}
                />
              </div>
              {loginFlag === false ? (
                <button
                  className={styles["frame-5"]}
                  onClick={handleLoginClick}
                >
                  <span className={styles["check-button"]}>이메일 확인</span>
                </button>
              ) : (
                <button
                  className={styles["frame-5"]}
                  onClick={handleLoginClick}
                >
                  <span className={styles["login-button"]}>로그인</span>
                </button>
              )}
            </div>
            {showPasswordInput && ( // 비밀번호 입력 필드 표시
              <div className={styles["frame-7"]}>
                <input
                  className={styles["frame-input"]}
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  onChange={handlePassword}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles["frame-6"]}>
          <button
            className={styles["school-verification-registration"]}
            onClick={moveToSignUp}
          >
            학교 인증 회원가입
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
