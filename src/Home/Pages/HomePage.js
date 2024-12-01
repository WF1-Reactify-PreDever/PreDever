import { React, useEffect, useState } from "react";
import Header from "../Components/Header"; // 카테고리와 통합된 Header
import BlogCard from "../Components/BlogCard";
import "../Styles/HomePage.css"; // 스타일 파일 추가
import { useLocation } from "react-router-dom";

const HomePage = () => {
  // singUp 페이지로부터 이름과 이메일을 전달받음( id, email 변수로 사용가능) jsw 추가
  // const location = useLocation();
  // const { id, email } = location.state || {}; // 전달된 상태를 가져옴
  // console.log(id, email)

  const blogs = [
    {
      title: "2차 인터뷰 합격 후기",
      author: "가온",
      date: "6일 전",
      description: "비전공자가 카카오에 합격한 과정!",
      likes: 171,
    },
    {
      title: "FSD 관점으로 코드 경계 찾기",
      author: "teo.v",
      date: "6일 전",
      description: "Feature-Slided Design에 대한 이야기",
      likes: 65,
    },
    // 추가 블로그 데이터
  ];

  
  return (
    <div className="home-page">
      {/* Header에 카테고리 탭 통합 */}
      <Header />
      <div className="content-area">
        <div className="blog-list">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
