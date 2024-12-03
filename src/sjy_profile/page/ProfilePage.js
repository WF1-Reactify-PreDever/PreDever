// src/profile/ProfilePage.js
import React, { useState } from 'react';
import './ProfilePage.module.css';
import { useSelector } from 'react-redux';
import ProfilePost from './components/ProfilePost';

const ProfilePage = () => {
  const { user, posts } = useSelector((state) => state.profile);

  const [selectedTab, setSelectedTab] = useState('all');

  if (!user) {
    return (
      <div className="error-message">
        <p>사용자 정보가 없습니다.</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="error-message">
        <p>게시물이 없습니다.</p>
      </div>
    );
  }

  const filteredPosts = posts.filter((post) => {
    return selectedTab === 'all' || post.tag === selectedTab;
  });

  return (
    <div className="profile-page">
      <header className="page-header">
        <h1>{user.username}'s PreDever</h1>
      </header>
      <section className="profile-header">
        <div className="header-content">
          <img src={user.avatar} alt={`${user.username} Avatar`} />
          <h1>{user.username}</h1>
          <p className="user-description">개발을 사랑하는 {user.username}님의 포트폴리오와 게시물입니다.</p>
        </div>
      </section>

      {/* 탭 및 게시물 섹션 */}
      <main>
        <div className="tabs">
          <button onClick={() => setSelectedTab('all')}>전체 글</button>
          <button onClick={() => setSelectedTab('portfolio')}>포트폴리오</button>
        </div>
        <div className="post-list">
          {filteredPosts.length === 0 ? (
            <p className="no-posts">필터링된 게시물이 없습니다.</p>
          ) : (
            filteredPosts.map((post) => (
              <ProfilePost key={post.id} post={post} />
            ))
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="profile-footer">
        <p>&copy; 2024 PreDever. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
