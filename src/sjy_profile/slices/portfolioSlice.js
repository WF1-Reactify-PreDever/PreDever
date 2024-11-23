// src/profile/portfolioSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 더미 포트폴리오 데이터
const dummyPortfolio = [
  { id: 1, title: '프로젝트 1', description: '이 프로젝트는 ...' },
  { id: 2, title: '프로젝트 2', description: '이 프로젝트는 ...' },
  // 더 많은 데이터 추가
];

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    items: dummyPortfolio, // 초기 더미 데이터
    loading: false,
  },
  reducers: {
    setPortfolioItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPortfolioItems, setLoading } = portfolioSlice.actions;
export default portfolioSlice.reducer;
