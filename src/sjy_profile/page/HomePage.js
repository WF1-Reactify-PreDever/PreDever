import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>개발자를 위한 커뮤니티</h1>
      <p>포트폴리오를 작성하고, 공유하며, 수익을 창출하세요.</p>
      <nav>
        <Link to="/portfolio">포트폴리오</Link>
        <Link to="/profile">프로필</Link>
        <Link to="/login">로그인</Link>
      </nav>
    </div>
  );
};

export default Home;
