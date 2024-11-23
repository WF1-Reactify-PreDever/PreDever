import React from "react";
import styles from "../css/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles["div-wrapper"]}>
        <div className={styles["text-wrapper"]}>PreDever</div>
      </div>
    </header>
  );
};

export default Header;
