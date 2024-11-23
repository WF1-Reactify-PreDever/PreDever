import React from 'react';
import '../Styles/Header.css'; // 스타일 파일 경로를 올바르게 수정

const Header = () => {
  return (
    <header className="header">
      {/* 제목 영역 */}
      <div className="logo">
        <h1>PreDever</h1>
      </div>
      
      {/* 버튼 영역 */}
      <nav className="nav">
        <button className="icon-button">
          <span role="img" aria-label="notifications">🔔</span> {/* 알림 */}
        </button>
        <button className="icon-button">
          <span role="img" aria-label="search">🔍</span> {/* 검색 */}
        </button>
        <button className="login-button">로그인</button> {/* 로그인 */}
      </nav>
    </header>
  );
};

export default Header;
