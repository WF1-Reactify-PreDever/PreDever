import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import BlogCard from '../Components/BlogCard';
// import '../Styles/HomePage.css'; // 필요하다면 추가

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
    // 추가 블로그 데이터
  ];

  return (
    <div className="home-page">
      <Header />
      <div className="main-content">
        <Sidebar />
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
