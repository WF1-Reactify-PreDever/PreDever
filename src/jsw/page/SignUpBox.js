import React, { useState } from "react";
import style from "../css/SignUpBox.module.css";

const SignUpBox = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    props.onChange(value); // 부모에게 입력 값을 전달
  };

  const handleVerification = () => {
    if (inputValue === props.verificationCode) {
      props.setCompVerifiCode(true); // 인증 성공 시 true로 설정
      alert("인증되었습니다!");
    } else {
      props.setCompVerifiCode(false); // 인증 실패 시 false로 설정
      alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
    }
  };

  return (
    <div className={style.frame}>
      {props.text === "이름" ? (
        <input
          type="text"
          placeholder={props.text}
          className={style.id}
          onChange={handleChange}
        />
      ) : props.text === "비밀번호" ? (
        <input
          type="password"
          placeholder={props.text}
          className={style.id}
          onChange={handleChange}
        />
      ) : props.text === "E-Mail" ? (
        <input
          type="text"
          placeholder={props.text}
          className={style.id}
          onChange={handleChange}
        />
      ) : props.text === "인증번호" ? (
        <div className={style.inputWithButton}>
          <input
            type="text"
            placeholder={props.text}
            className={style.id}
            onChange={handleChange}
          />
          <button className={style.verifyButton} onClick={handleVerification}>
            인증하기
          </button>
        </div>
      ) : props.text === "비밀번호 확인" ? (
        <input
          type="password"
          placeholder={props.text}
          className={style.id}
          onChange={handleChange}
        />
      ) : null}
    </div>
  );
};

export default SignUpBox;
