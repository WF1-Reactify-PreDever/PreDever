// src/profile/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // 초기 상태 설정
  posts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setPosts(state, action) {
      state.posts = action.payload; // posts 상태 업데이트
    },
  },
});

export const { setUser, clearUser, setPosts } = userSlice.actions;
export default userSlice.reducer;
