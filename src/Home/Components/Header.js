import {React, useState} from 'react';
import '../Styles/Header.css'; // 스타일 파일 경로를 올바르게 수정
import LoginModal from '../../jsw/modal/LoginModal';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = (event) => {
        setModalIsOpen(false)
        // 이벤트 버블링을 막음
        event.stopPropagation()
    }

  return (
    <header className="header">
      {/* 제목 영역 */}
      <div className="logo">
        <h1>PreDever</h1>
      </div>

      <LoginModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal} />

      {/* 버튼 영역 */}
      <nav className="nav">
        <button className="icon-button">
          <span role="img" aria-label="notifications">🔔</span> {/* 알림 */}
        </button>
        <button className="icon-button">
          <span role="img" aria-label="search">🔍</span> {/* 검색 */}
        </button>
        <button className="login-button" onClick={openModal}>로그인</button> {/* 로그인 */}
      </nav>
    </header>
  );
};

export default Header;
