import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styles from '../css/LoginModal.module.css'; // CSS 모듈 import

const LoginModal = (props) => {
    Modal.setAppElement('#root');
    const navigate = useNavigate();

    const moveToSignUp = () => {
        navigate("/signUp");
    };

    return (
        <Modal className={styles["main-container"]} // CSS 모듈 사용
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}>
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
                                <input className={styles["frame-input"]} placeholder='이메일을 입력하세요.' />
                            </div>
                            <button className={styles["frame-5"]}>
                                <span className={styles["login-button"]}>로그인</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles["frame-6"]}>
                    <button className={styles["school-verification-registration"]} onClick={moveToSignUp}>
                        학교 인증 회원가입
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default LoginModal;
