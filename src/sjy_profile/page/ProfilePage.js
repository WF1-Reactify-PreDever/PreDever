// src/profile/ProfilePage.js
import React, { useState } from 'react';
import styles from './ProfilePage.module.css';  // CSS 모듈 import
import { useSelector } from 'react-redux';
import ProfilePost from './components/ProfilePost';

const ProfilePage = () => {
  const { user, posts } = useSelector((state) => state.profile);

  const [selectedTab, setSelectedTab] = useState('all');

  if (!user) {
    return (
      <div className={styles.errorMessage}> {/* CSS 모듈로 클래스 적용 */}
        <p>사용자 정보가 없습니다.</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className={styles.errorMessage}> {/* CSS 모듈로 클래스 적용 */}
        <p>게시물이 없습니다.</p>
      </div>
    );
  }

  const filteredPosts = posts.filter((post) => {
    return selectedTab === 'all' || post.tag === selectedTab;
  });

  return (
    <div className={styles.profilePage}> {/* CSS 모듈로 클래스 적용 */}
      <header className={styles.pageHeader}>
        <h1>{user.username}'s PreDever</h1>
      </header>
      <section className={styles.profileHeader}>
        <div className={styles.headerContent}>
          <img src={user.avatar} alt={`${user.username} Avatar`} />
          <h1>{user.username}</h1>
          <p className={styles.userDescription}>개발을 사랑하는 {user.username}님의 포트폴리오와 게시물입니다.</p>
        </div>
      </section>

      {/* 탭 및 게시물 섹션 */}
      <main>
        <div className={styles.tabs}>
          <button onClick={() => setSelectedTab('all')}>전체 글</button>
          <button onClick={() => setSelectedTab('portfolio')}>포트폴리오</button>
        </div>
        <div className={styles.postList}>
          {filteredPosts.length === 0 ? (
            <p className={styles.noPosts}>필터링된 게시물이 없습니다.</p>
          ) : (
            filteredPosts.map((post) => (
              <ProfilePost key={post.id} post={post} />
            ))
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className={styles.profileFooter}>
        <p>&copy; 2024 PreDever. 모든 권리 보유.</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
