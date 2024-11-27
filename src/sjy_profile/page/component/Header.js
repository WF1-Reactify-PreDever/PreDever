// src/sjy_profile/component/Header.js
import React, { useState } from 'react';
import styles from '../../css/Header.module.css';  // CSS 모듈 import
import { Link } from 'react-router-dom'; 
import LoginModal from '../../../jsw/modal/LoginModal';

const Header = ({ username }) => {
  // 모달 코드
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = (event) => {
    setModalIsOpen(false);
    event.stopPropagation();
  };

  return (
    <header className={styles.header}>
      {/* 로그인 모달 */}
      <LoginModal isOpen={modalIsOpen} onRequestClose={closeModal} />

      {/* 로고와 버튼 영역 */}
      <div className={styles.headerTop}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="/assets/로고1.png" alt="PreDever" className={styles.logoImg} />
          </Link> {/* 로고 이미지 */}
          <h1>{username}'s PreDever</h1>
        </div>
        <nav className={styles.nav}>
          <button className={styles.iconButton}>
            <img src="/assets/bell.png" alt="알림" className={styles.iconImage} /> {/* 알림 버튼 */}
          </button>
          <button className={styles.iconButton}>
            <img src="/assets/search.png" alt="검색" className={styles.iconImage} /> {/* 검색 버튼 */}
          </button>
          <button className={styles.loginButton} onClick={openModal}>로그인</button> {/* 로그인 */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
