// src/sjy_profile/page/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import style from '../css/Profile.module.css'; 
import ProfilePost from './component/ProfilePost';
import Header from './component/Header';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProfilePage = () => {
  const { username } = useParams(); 

  const [user, setUser] = useState(null); 
  const [posts, setPosts] = useState([]); 
  const [status, setStatus] = useState('idle'); 
  const [error, setError] = useState(null); 
  const [selectedTab, setSelectedTab] = useState('all'); 

  // 사용자 정보와 게시물 가져오기 함수
  const getUserAndPosts = async () => {
    try {
      setStatus('loading');

      // 사용자 정보 가져오기
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const userSnapshot = await getDocs(q);
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setUser(userData);
      } else {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      // 게시물 정보 가져오기
      const postsRef = collection(db, "posts");
      const postsQuery = query(postsRef, where("author", "==", username));
      const postsSnapshot = await getDocs(postsQuery);
      const postsData = [];
      postsSnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });

      setPosts(postsData);
      setStatus('succeeded');
    } catch (error) {
      setError(error.message);
      setStatus('failed');
    }
  };

  useEffect(() => {
    getUserAndPosts();
  }, [username]);

  if (status === 'failed') {
    return <div className="error-message"><p>{error}</p></div>;
  }

  if (status === 'idle' || status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.profilePage}>
      {user && <Header username={user.username} />}
      <section className={style.profileHeader}>
        <div className={style.headerContent}>
          {user && <img src={user.avatar} alt={`${user.username} Avatar`} className={style.avatar} />}
          {user && <h1 className={style.username}>{user.username}</h1>}
          <p className={style.userDescription}>개발을 사랑하는 {user.username}님의 포트폴리오와 게시물입니다.</p>
        </div>
      </section>

      <main>
        <div className={style.tabs}>
          <div
            className={selectedTab === 'all' ? `${style.tab} ${style.active}` : style.tab}
            onClick={() => setSelectedTab('all')}
          >
            전체 글
          </div>
          <div
            className={selectedTab === 'portfolio' ? `${style.tab} ${style.active}` : style.tab}
            onClick={() => setSelectedTab('portfolio')}
          >
            포트폴리오
          </div>
        </div>

        {/* ProfilePost에 posts 전달 */}
        <ProfilePost posts={posts} />
      </main>
    </div>
  );
};

export default ProfilePage;
