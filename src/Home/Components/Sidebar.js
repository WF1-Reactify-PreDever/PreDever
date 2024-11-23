import React from 'react';
import '../Styles/Sidebar.css'; // 올바른 경로로 수정

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Categories</h2>
      <ul>
        <li>Technology</li>
        <li>Design</li>
        <li>Development</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
