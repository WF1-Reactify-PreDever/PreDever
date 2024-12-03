// src/sjy_profile/dummyData.js
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js'; // Firebase 설정 가져오기

const saveDummyUser = async () => {
  const user = {
    username: 'Bunny',
    avatar: './asset/bunny.png',
  };

  try {
    const userRef = await addDoc(collection(db, 'users'), user);
    console.log('추가된 사용자 ID:', userRef.id);
    return { id: userRef.id, ...user };
  } catch (error) {
    console.error('사용자 추가 중 오류:', error);
    throw error;
  }
};

const saveDummyPosts = async (userId) => {
  const dummyPosts = [
    {
      title: '더미 포스트 1',
      content: '이것은 더미 포스트 1의 내용입니다.',
      timestamp: new Date().toISOString(),
      authorId: userId,
      views: 10,
      likes: 5,
    },
    {
      title: '더미 포스트 2',
      content: '이것은 더미 포스트 2의 내용입니다.',
      timestamp: new Date().toISOString(),
      authorId: userId,
      views: 15,
      likes: 8,
    },
    {
      title: '더미 포스트 3',
      content: '이것은 더미 포스트 3의 내용입니다.',
      timestamp: new Date().toISOString(),
      authorId: userId,
      views: 20,
      likes: 12,
    },
  ];

  try {
    const postPromises = dummyPosts.map(post =>
      addDoc(collection(db, 'posts'), post)
    );

    const docRefs = await Promise.all(postPromises);
    const postsWithId = docRefs.map((docRef, index) => ({
      id: docRef.id,
      ...dummyPosts[index],
    }));

    console.log('추가된 포스트:', postsWithId);
    return postsWithId;
  } catch (error) {
    console.error('포스트 추가 중 오류:', error);
    throw error;
  }
};

const saveDummyData = async () => {
  try {
    const user = await saveDummyUser();
    await saveDummyPosts(user.id);
  } catch (error) {
    console.error('더미 데이터 추가 중 오류:', error);
  }
};

saveDummyData();
