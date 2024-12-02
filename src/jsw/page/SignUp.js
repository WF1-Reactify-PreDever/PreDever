import React, { useState } from "react"; // useState를 import
import styles from "../css/SignUp.module.css";
import SignUpBox from "./SignUpBox";
import emailjs from "emailjs-com";
import { db } from "../../firebase";
import { collection, setDoc, addDoc, doc, getDoc } from "firebase/firestore";
import Header from "../../Home/Components/Header";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [num, setNum] = useState("");
  const [verificationCode, setVerificationCode] = useState(0);
  const [compVerifiCode, setCompVerifiCode] = useState(false);
  const navigation = useNavigate();
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
    if (verification) {
      setCompVerifiCode(true);
    }
  };

  // test 위한 함수
  const click = () => {
    console.log("이름:", id);
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
    // 이메일 형식 검사: @가 한 번만 등장하고, @ 뒤에 "hansung"이 포함되어야 함
    const emailPattern = /^[^\s@]+@hansung\.[^\s@]+$/;

    // 이메일 형식이 맞고, @ 뒤에 "hansung"이 포함되어 있으면 true 반환
    return emailPattern.test(email);
  };

  // 인증 이메일 보내는 함수
  const sendEmail = async (e) => {
    // 이벤트 버블링을 막음
    e.preventDefault();

    if (email === "" || !isValidEmail(email)) {
      alert("이메일을 제대로 확인해주세요.");
      return;
    }

    // 이메일 존재 여부 확인
    const emailExists = await checkEmail(email);
    if (emailExists) {
      alert("이미 존재하는 이메일입니다.");
      return; // 이메일이 존재할 경우 인증을 진행하지 않음
    }

    const code = generateRandomCode(); // 랜덤 코드 생성
    setVerificationCode(code); // 상태에 랜덤 코드 저장

    const templateParams = {
      to_email: email,
      verification_code: `인증번호 : ${code}`, // 랜덤 코드 포함
    };

    emailjs
      .send(
        "service_o3sfhjt", // service id
        "template_suycgte", // template id
        templateParams,
        "TcqzbSYYXCNZjx1jN" // public key
      )
      .then(
        (response) => {
          // console.log("SUCCESS!", response.status, response.text);
          alert("인증 코드가 이메일로 전송되었습니다"); // 사용자에게 코드 알림
        },
        (err) => {
          // console.error("FAILED...", err);
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

  // 이미 이메일이 있는지 확인하는 함수
  const checkEmail = async (email) => {
    const docRef = doc(db, "userDetail", email); // 이메일을 문서 ID로 사용
    const docSnap = await getDoc(docRef); // 문서 가져오기

    return docSnap.exists(); // 문서가 존재하면 true, 아니면 false 반환
  };

  // db에 정보 저장하는 함수
  const saveToFirestore = async () => {
    if (id && password && email && compVerifiCode) {
      if (!isValidEmail(email)) {
        alert("이메일을 다시 확인해주세요.");
        return;
      }

      // 이메일 존재 여부 확인
      const emailExists = await checkEmail(email);
      if (emailExists) {
        alert("이미 존재하는 이메일입니다.");
        return; // 이메일이 존재하면 회원가입 진행하지 않음
      }

      try {
        // 문서 ID를 id로 설정
        const docRef = doc(db, "userDetail", email); // 사용자 email을 문서 이름으로 사용
        await setDoc(docRef, {
          id,
          email,
          password,
        });
        alert("회원가입이 성공적으로 완료되었습니다.");
        // 홈으로 이동하면서 상태 전달
        navigation("/", { state: { id, email } });
      } catch (e) {
        console.error("문서 추가 오류:", e);
        alert("회원 가입 실패");
      }
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  };

  return (
    <div className={styles["main-page"]}>
      <Header style={{ width: "100%" }} signUpFlag={"true"} />
      <div className={styles.posts}>
        <div className={styles["sign-up-frame"]}>
          <div className={styles.title}>회원가입</div>
          <SignUpBox text="이름" onChange={handleIdChange} />
          <SignUpBox text="E-Mail" onChange={handleEmailChange} />
          <SignUpBox text="비밀번호" onChange={handlePasswordChange} />
          <SignUpBox text="비밀번호 확인" onChange={handlePasswordChange} />
          <SignUpBox
            text="인증번호"
            onChange={handleNumChange}
            verificationCode={verificationCode}
            setCompVerifiCode={setCompVerifiCode}
          />
          <div className={styles.btnBox}>
            {/* <button onClick={click}>console Test</button>
            <button onClick={saveToFirestore}>DB에 저장</button> */}
            <button onClick={sendEmail}>인증번호 전송</button>
            {/* <button onClick={verification}>인증 테스트</button> */}
          </div>
          {/* 인증 성공 시에 계정 생성 버튼 나타남 */}
          {compVerifiCode === true ? (
            <button className={styles.signUpBtn} onClick={saveToFirestore}>
              계정 생성
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
