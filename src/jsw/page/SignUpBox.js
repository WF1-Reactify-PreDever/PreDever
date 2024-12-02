import React, { useState } from "react";
import style from "../css/SignUpBox.module.css";

const SignUpBox = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    props.onChange(value); // 부모에게 입력 값을 전달
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
          <button className={style.verifyButton} onClick={props.sendEmail}>
            인증번호 전송
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
