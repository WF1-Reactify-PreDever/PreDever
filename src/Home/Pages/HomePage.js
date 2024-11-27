import {React, useState} from 'react';
import Header from '../Components/Header'; // 카테고리와 통합된 Header
import BlogCard from '../Components/BlogCard';
import '../Styles/HomePage.css'; // 스타일 파일 추가

const HomePage = () => {

  const blogs = [
    {
      title: '2차 인터뷰 합격 후기',
      author: '가온',
      date: '6일 전',
      description: '비전공자가 카카오에 합격한 과정!',
      likes: 171,
    },
    {
      title: 'FSD 관점으로 코드 경계 찾기',
      author: 'teo.v',
      date: '6일 전',
      description: 'Feature-Slided Design에 대한 이야기',
      likes: 65,
    },
    {
      title: '(번역) 자바스크립트와 타입스크립트에서..',
      author: 'Bunny',
      date: '1일 전',
      description: '메모이제이션(memoization)와 캐싱은 프로그래밍의 기본 개념입니다. ...',
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
            <div key={index} className="blog-item">
            <BlogCard {...blog} />
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
