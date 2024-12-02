import React from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용
import "../Styles/BlogCard.css";

const BlogCard = ({ id, title, author, date, description, likes, image }) => {
  const navigate = useNavigate();

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/posts/${id}`); // 게시물의 ID를 URL에 포함하여 상세 페이지로 이동
  };

  return (
    <div className="blog-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img
        src={image || process.env.PUBLIC_URL + "/로고3.png"} // public 폴더에서 이미지 참조
        alt={title}
        className="blog-image"
      />
      <div className="blog-content">
        <h3 className="blog-title">{title}</h3>
        <p className="blog-description">{description}</p>
        <div className="blog-info">
          <span className="blog-author">by {author}</span>
          <span className="blog-date">{date}</span>
        </div>
        <div className="blog-likes">❤️ {likes}</div>
      </div>
    </div>
  );
};

export default BlogCard;