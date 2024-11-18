import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPortfolio } from "../redux/slices/portfolioSlice";

const Portfolio = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const portfolioData = { title, description };
    dispatch(addPortfolio(portfolioData));
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h1>포트폴리오 등록</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
};

export default Portfolio;
