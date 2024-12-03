// src/profile/PortfolioPage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPortfolioItems } from '../slices/portfolioSlice'; // 포트폴리오 데이터 액션 임포트

function PortfolioPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(setPortfolioItems([])); // 더미 데이터 업데이트
  }, [dispatch]);

  return (
    <div>
      <h1>포트폴리오 페이지</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          {items && items.length > 0 ? (
            items.map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            ))
          ) : (
            <p>데이터가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;
