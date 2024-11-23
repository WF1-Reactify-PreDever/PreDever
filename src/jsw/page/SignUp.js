import React, { useState } from "react"; // useState를 import
import styles from "../css/SignUp.module.css";
import SignUpBox from "./SignUpBox";
import emailjs from "emailjs-com";
import { db } from "../../firebase";
import { collection, setDoc, addDoc, doc } from "firebase/firestore";
import Header from "../component/Header";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleIdChange = (value) => {
    setId(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleNumChange = (value) => {
    setNum(value);
  };

  // test 위한 함수
  const click = () => {
    console.log("아이디:", id);
    console.log("비밀번호:", password);
    console.log("E-Mail:", email);
    console.log("인증번호:", num);
  };

  // 랜덤 인증코드 생성
  const generateRandomCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // 이메일 유효성 검사
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // 인증 이메일 보내는 함수
  const sendEmail = (e) => {
    if (email === "" || !isValidEmail(email)) {
      alert("이메일을 제대로 확인해주세요.");
      return;
    }
    // 이벤트 버블링을 막음
    e.preventDefault();

    const code = generateRandomCode(); // 랜덤 코드 생성
    setVerificationCode(code); // 상태에 랜덤 코드 저장

    const templateParams = {
      to_email: email,
      verification_code: `인증번호 : ${code}`, // 랜덤 코드 포함
    };

    emailjs
      // 환경변수 설정해줘서 숨겨야함
      .send(
        "service_o3sfhjt", // service id
        "template_suycgte", // template id
        templateParams,
        "TcqzbSYYXCNZjx1jN" // public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("인증 코드가 이메일로 전송되었습니다: " + code); // 사용자에게 코드 알림
        },
        (err) => {
          console.error("FAILED...", err);
          alert("이메일 전송 실패");
        }
      );
  };

  // 인증번호 확인 함수
  const verification = () => {
    if (verificationCode === num && verificationCode !== "") {
      alert("인증 되었습니다!");
    } else {
      alert("인증 번호를 다시 확인해주세요.");
    }
  };

  const saveToFirestore = async () => {
    if (id && password && email) {
      if(!isValidEmail(email)) {
        alert("이메일을 다시 확인해주세요.")
        return;
      }
      try {
        // 문서 ID를 id로 설정
        const docRef = doc(db, "items", id); // 사용자 ID를 문서 이름으로 사용
        await setDoc(docRef, {
          password,
          email,
          num,
        });
        alert("정보가 성공적으로 저장되었습니다.");
      } catch (e) {
        console.error("문서 추가 오류:", e);
        alert("정보 저장 실패");
      }
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  };

  return (
    <div className={styles["main-page"]}>
      <Header />
      <div className={styles.posts}>
        <div className={styles["sign-up-frame"]}>
          <SignUpBox text="아이디" onChange={handleIdChange} />
          <SignUpBox text="비밀번호" onChange={handlePasswordChange} />
          <SignUpBox text="E-Mail" onChange={handleEmailChange} />
          <SignUpBox text="인증번호" onChange={handleNumChange} />
        </div>
      </div>
      <button onClick={click}>console Test</button>
      <button onClick={saveToFirestore}>DB에 저장</button>
      <button onClick={sendEmail}>인증번호 전송</button>
      <button onClick={verification}>인증하기</button>
    </div>
  );
};

export default SignUp;
