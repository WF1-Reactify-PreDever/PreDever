import React, { useState, useRef, useEffect } from "react";
import "../Styles/Header.css";

// 이미지 경로 import
import bellIcon from "../Assets/bell.png";
import searchIcon from "../Assets/search.png";
import LoginModal from "../../jsw/modal/LoginModal";
import logoImage from "../Assets/로고3.png"

// props 추가 jsw 수정
const Header = (props) => {
  // 모달 코드
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = (event) => {
    setModalIsOpen(false);
  };

  const [activeTab, setActiveTab] = useState("최신"); // 기본 활성 탭
  const underlineRef = useRef(null);

  const categories = ["최신", "트렌딩", "피드"]; // 카테고리 배열

  useEffect(() => {
    const activeTabElement = document.querySelector(".tab.active");
    if (activeTabElement && underlineRef.current) {
      underlineRef.current.style.width = `${activeTabElement.offsetWidth}px`; // 탭의 너비로 바 조정
      underlineRef.current.style.left = `${activeTabElement.offsetLeft}px`; // 탭의 위치로 이동
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <header className="header">
      {/* 로그인 모달 */}
      <LoginModal isOpen={modalIsOpen} onRequestClose={closeModal} />
        
      {/* 로고와 버튼 영역 */}
      <div className="header-top">
        <div className="logo">
          <img src={logoImage} alt="로고" className="logo-image" /> {/* 로고 이미지 추가 */}
          <h1 className="logo-text">PreDever</h1>
        </div>
        <nav className="nav">
          {props.signUpFlag === "true" ? null : (
            <>
              <button className="icon-button">
                <img src={bellIcon} alt="알림" className="icon-image" />{" "}
                {/* 알림 버튼 */}
              </button>
              <button className="icon-button">
                <img src={searchIcon} alt="검색" className="icon-image" />{" "}
                {/* 검색 버튼 */}
              </button>
              <button className="login-button" onClick={openModal}>
                로그인
              </button>{" "}
            </>
          )}
          {/* 로그인 */}
        </nav>
      </div>

      {/* 카테고리 탭 영역 */}
      {/* 회원가입 페이지 일 때는 안보이게 수정 jsw 추가 */}
      {props.signUpFlag === "true" ? null : (
        <nav className="category-tabs">
          <div className="tabs">
            {categories.map((category) => (
              <div
                key={category}
                className={`tab ${activeTab === category ? "active" : ""}`}
                onClick={() => handleTabClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
          <div ref={underlineRef} className="underline"></div>
        </nav>
      )}
    </header>
  );
};

export default Header;