// import React, { useEffect, useState } from "react";
// import Header from "../Components/Header";
// import BlogCard from "../Components/BlogCard";
// import fetchPosts from "../Components/fetchPosts";
// import "../Styles/HomePage.css";

// const HomePage = () => {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const loadBlogs = async () => {
//       const posts = await fetchPosts();
//       setBlogs(posts);
//     };
//     loadBlogs();
//   }, []);

//   return (
//     <div className="home-page">
//       <Header />
//       <div className="content-area">
//         <div className="blog-list">
//           {blogs.length > 0 ? (
//             blogs.map((blog) => (
//               <BlogCard
//                 key={blog.id}
//                 title={blog.title}
//                 author={blog.author}
//                 date={new Date(blog.timestamp).toLocaleDateString()}
//                 description={blog.content}
//                 likes={blog.likes}
//               />
//             ))
//           ) : (
//             <p>블로그 게시물이 없습니다.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import BlogCard from "../Components/BlogCard";
import fetchPosts from "../Components/fetchPosts";
import "../Styles/HomePage.css";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  // singUp 페이지로부터 이름과 이메일을 전달받음( id, email 변수로 사용가능) jsw 추가
  const location = useLocation();
  const { id, email } = location.state || {}; // 전달된 상태를 가져옴
  console.log(id, email)

  useEffect(() => {
    const loadBlogs = async () => {
      const posts = await fetchPosts();

      // 데이터 반복하여 30개로 확장
      const repeatedPosts = [];
      while (repeatedPosts.length < 30) {
        repeatedPosts.push(...posts);
      }
      setBlogs(repeatedPosts.slice(0, 30)); // 정확히 30개만 유지
    };
    loadBlogs();
  }, []);

  
  return (
    <div className="home-page">
      <Header />
      <div className="content-area">
        <div className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <BlogCard
                key={`${blog.id}-${index}`} // 중복된 id를 방지하기 위해 index 추가
                title={blog.title}
                author={blog.author}
                date={new Date(blog.timestamp).toLocaleDateString()}
                description={blog.content}
                likes={blog.likes}
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