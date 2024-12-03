import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/BlogCard.css";

const BlogCard = ({ id, title, author, date, description, likes, image }) => {
  const navigate = useNavigate();

  // 카드 클릭 시 PostDetail 페이지로 이동
  const handleCardClick = () => {
    navigate(`/postdetail`, { state: { id } }); // 문서 ID 전달
  };

  // Author 클릭 시 프로필 페이지로 이동
  const handleAuthorClick = (event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    navigate(`/profile/${author}`); // 프로필 페이지로 이동
  };

  return (
    <div className="blog-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <img
        src={image || process.env.PUBLIC_URL + "/로고3.png"}
        alt={title}
        className="blog-image"
      />
      <div className="blog-content">
        <h3 className="blog-title">{title}</h3>
        <p className="blog-description">{description}</p>
        <div className="blog-info">
          <span className="blog-author" onClick={handleAuthorClick} style={{ color: "#007bff", cursor: "pointer" }}>
            by {author}
          </span>
          <span className="blog-date">{date}</span>
        </div>
        <div className="blog-likes">❤️ {likes}</div>
      </div>
    </div>
  );
};

export default BlogCard;