// src/profile/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    username: 'Bunny',
    avatar: 'profileImage.png', // 사용자 이미지 경로
  },
  posts: [
    {
      id: 1,
      title: 'ch.01 인터넷 네트워크',
      description: '웹, HTTP 모두 인터넷 망 기반으로 작동하기 때문에 사전 네트워크에 대한 기본 학습이...',
      date: '2024년 11월 9일',
      comments: 0,
      views: 0,
      likes: 0,
      likedUsers: [],
    },
    {
      id: 2,
      title: 'ch.03 HTTP 기본',
      description: '하이퍼텍스트 전송 프로토콜은 하이퍼링크를 사용하여 인터넷에서 페이지를 로드하는 데...',
      date: '2024년 11월 9일',
      comments: 0,
      views: 0,
      likes: 0,
      likedUsers: [],
    },
    {
      id: 3,
      tag: 'portfolio',
      title: '웹개발자 포트폴리오',
      description: '취업 당시 작성했던 포트폴리오입니다. 더하여 포트폴리오를 작성하며 추구했던 사항을 정...',
      date: '2024년 11월 12일',
      comments: 0,
      views: 0,
      likes: 0,
      likedUsers: [],
    },
    {
      id: 4,
      title: 'ch.04 HTTP 메서드',
      description: 'HTTP 메서드란 클라이언트와 서버 사이에 이루어지는 요청(Request)과 응답(Response)...',
      date: '2024년 11월 13일',
      comments: 0,
      views: 0,
      likes: 0,
      likedUsers: [],
    },
    {
      id: 5,
      title: 'Ch.06 HTTP 상태코드',
      description: '모든 HTTP 응답 코드는 5개의 클래스(분류)로 구분되는데, 상태 코드의 첫 번째 숫자는...',
      date: '2024년 11월 14일',
      comments: 0,
      views: 0,
      likes: 0,
      likedUsers: [],
    },
    {
      id: 6,
      title: 'Ch.08 HTTP 헤더',
      description: 'HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록...',
      date: '2024년 11월 22일',
      comments: 0,
      views: 0,
      likes: 0,
      likedUsers: [],
    },
    {
      id: 7,
      tag: 'portfolio',
      title: 'DB엔지니어 포트폴리오',
      description: 'DB분야로 이직하면서 준비한 포트폴리오입니다. cs기본기를 철저히 다지고, 코딩테스트를 준...',
      date: '2025년 8월 12일',
      comments: 0,
      views: 0,
      likes: 0,
      likedUsers: [],
    },
  ],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    incrementViews: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) post.views += 1;
    },
    incrementLikes: (state, action) => {
      const { postId, username } = action.payload; // payload에 사용자 이름 추가
      const post = state.posts.find((post) => post.id === postId);  
      if (post) {
        if (!post.likedUsers) {
          post.likedUsers = []; // likedUsers 초기화
        }
        if (post.likedUsers.includes(username)) {
          // 이미 좋아요를 누른 경우 좋아요 취소
          post.likes -= 1;
          post.likedUsers = post.likedUsers.filter((user) => user !== username);
        } else {
          // 좋아요 추가
          post.likes += 1;
          post.likedUsers.push(username);
        }
      }
    },    
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments += 1;
        post.commentList.push(comment); // 댓글 목록에 새로운 댓글 추가
      }
    },
  },
});

export const { incrementViews, incrementLikes, addComment } = profileSlice.actions;

export default profileSlice.reducer;
