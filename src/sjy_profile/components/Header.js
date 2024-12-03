// src/sjy_profile/components/Header.js
import React, { useState } from 'react';
import styles from '../css/Header.module.css';  // CSS 모듈 import
import { Link } from 'react-router-dom'; 
import LoginModal from '../../jsw/modal/LoginModal';

const Header = ({ username, isLoggedIn }) => {
  // 모달 코드
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = (event) => {
    setModalIsOpen(false);
    event.stopPropagation();
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
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
          </Link>
          <h1>{username ? `${username}'s PreDever` : 'PreDever'}</h1>
        </div>
        <nav className={styles.nav}>
          <button className={styles.iconButton}>
            <img src="/assets/bell.png" alt="알림" className={styles.iconImage} />
          </button>
          <button className={styles.iconButton}>
            <img src="/assets/search.png" alt="검색" className={styles.iconImage} />
          </button>
        {//isLoggedIn && (
          <>
            <button className={styles.loginButton} onClick={toggleOptions}>
              글쓰기
            </button>
            {showOptions && (
              <div className={styles.writeOptions}>
                <Link to="/write-post" className={styles.optionLink}>포스트</Link>
                <Link to={`/write-portfolio/${username}`} className={styles.optionLink}>포트폴리오</Link>
              </div>
            )}
          </>
        }
        {/*!isLoggedIn && (
          <div className={styles.loginContainer}>
            <button className={styles.loginButton} onClick={openModal}>로그인</button>
          </div>
        )*/}
        </nav>
      </div>
    </header>
  );
};

export default Header;
