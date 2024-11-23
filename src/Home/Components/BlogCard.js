import React from 'react';
import '../Styles/BlogCard.css'; // 올바른 경로로 수정

const BlogCard = ({ title, author, date, description, likes }) => {
  return (
    <div className="blog-card">
      <h3 className="blog-title">{title}</h3>
      <p className="blog-author">by {author}</p>
      <p className="blog-date">{date}</p>
      <p className="blog-description">{description}</p>
      <div className="blog-likes">❤️ {likes} Likes</div>
    </div>
  );
};

export default BlogCard;
