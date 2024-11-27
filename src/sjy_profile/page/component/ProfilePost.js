// src/sjy_profile/component/ProfilePost.js
import React from 'react';
import { FaRegEye, FaRegComment, FaHeart } from 'react-icons/fa';
import { db } from '../../../firebase'; // Firebase 설정
import { doc, updateDoc } from 'firebase/firestore';
import styles from '../../css/Profile.module.css'; // CSS 모듈 임포트

const ProfilePost = ({ posts, username }) => {

  // 게시물 조회수 업데이트
  const handleView = async (postId) => {
    console.log("Title clicked, postId:", postId);
    const postRef = doc(db, "posts", postId);
    const post = posts.find(post => post.id === postId);
    await updateDoc(postRef, { views: post.views + 1 });
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className={styles.profilePost}>
          <h2 onClick={() => handleView(post.id)} >{post.title} </h2>
          <p>{post.content}</p>
          <footer>
            <span>{post.date}</span>
            <span className={styles.stat}>
              <FaRegEye className={styles.icon} />
              <span>{post.views}</span>
            </span>
            <span className={styles.stat}>
              <FaRegComment className={styles.icon} />
              <span>{post.comments}</span>
            </span>
            <span className={styles.stat}>
              <FaHeart className={`${styles.icon} ${styles['like-icon']}`} />
              <span>{post.likes}</span>
            </span>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default ProfilePost;
