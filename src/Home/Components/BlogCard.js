import React from "react";
import "../Styles/BlogCard.css";

const BlogCard = ({ title, author, date, description, likes, image }) => {
  return (
    <div className="blog-card">
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