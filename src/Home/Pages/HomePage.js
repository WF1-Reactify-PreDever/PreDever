import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import BlogCard from "../Components/BlogCard";
import fetchPosts from "../Components/fetchPosts";
import "../Styles/HomePage.css";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const posts = await fetchPosts(); // Firestore에서 데이터 가져오기
      setBlogs(posts); // 데이터 설정
    };
    loadBlogs();
  }, []);

  return (
    <div className="home-page">
      <Header />
      <div className="content-area">
        <div className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id} // 문서 ID 전달
                title={blog.title}
                author={blog.author}
                date={new Date(blog.timestamp).toLocaleDateString()}
                description={blog.content}
                likes={blog.likes}
                image={blog.image} // 이미지 전달 (Optional)
              />
            ))
          ) : (
            <p>블로그 게시물이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;