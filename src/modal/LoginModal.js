import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../css/LoginModal.css';

const LoginModal = (props) => {
    Modal.setAppElement('#root')
    const navigate = useNavigate();

    const moveToSignUp = () => {
        navigate("/signUp")
    }
    return (
        <Modal className='main-container'
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}>
            <div className='image-frame'>
                <div className='hanseongdae-gyopyo' />
            </div>
            <div className='flex-column-e'>
                <div className='login'>
                    <div className='frame'>
                        <span className='login-1'>로그인</span>
                    </div>
                    <div className='frame-2'>
                        <div className='frame-3'>
                            <div className='frame-4'>
                                <input className='frame-input' placeholder='이메일을 입력하세요.'/>
                            </div>
                            <button className='frame-5'>
                                <span className='login-button'>로그인</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='frame-6'>
                    <button className='school-verification-registration' onClick={moveToSignUp}>
                        학교 인증 회원가입
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default LoginModal;
