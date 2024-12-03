// src/profile/ProfilePage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementViews, incrementLikes } from '../../slices/profileSlice';
import { FaRegEye, FaRegComment, FaHeart } from 'react-icons/fa';

const ProfilePost = ({ post }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.profile.user.username); // 현재 사용자 이름 가져오기

  const handleView = () => {
    dispatch(incrementViews(post.id));
  };

  const handleLike = () => {
    dispatch(incrementLikes({ postId: post.id, username })); // 사용자 이름과 게시물 ID 전달
  };

  return (
    <div className="profile-post">
      <h2 onClick={handleView}>{post.title}</h2>
      <p>{post.description}</p>
      <footer>
        <span>{post.date}</span>
        <span className="stat">
          <FaRegEye className="icon" />
          <span>{post.views}</span>
        </span>
        <span className="stat">
          <FaRegComment className="icon" />
          <span>{post.comments}</span>
        </span>
        <span className="stat">
          <FaHeart
            className={`icon like-icon ${post.likedUsers?.includes(username) ? 'liked' : ''}`}
            onClick={handleLike}
          />
          <span>{post.likes}</span>
        </span>
      </footer>
    </div>
  );
};

export default ProfilePost;
