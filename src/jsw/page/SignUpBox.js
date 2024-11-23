import React, { useState } from "react";
import style from "../css/SignUpBox.module.css";
// // 엔터 키가 눌렸는지 확인 (엔터 키의 keyCode는 13)
// if (e.key === 'Enter') {
//     login();
// }
const SignUpBox = (props) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        props.onChange(value);  // 부모에게 입력 값을 전달
    };

    return (
        <div className={style.frame}>
            {props.text === "아이디" ?
                <input type="text" placeholder={props.text} className={style.id} onChange={handleChange} /> :
                props.text === "비밀번호" ?
                    <input type="password" placeholder={props.text} className={style.id} onChange={handleChange} /> :
                    props.text === "E-Mail" ?
                        <input type="text" placeholder={props.text} className={style.id} onChange={handleChange} /> :
                        props.text === "인증번호" ?
                            <input type="text" placeholder={props.text} className={style.id} onChange={handleChange} /> :
                            null
            }
        </div>
    );
};

export default SignUpBox;