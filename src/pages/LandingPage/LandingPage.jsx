import React from "react";
import styles from "./LandingPage.module.scss";

const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <div className={styles.welcomeContainer}>
        <span className={styles.title}>Welcome to Design Forge</span>
        <span className={styles.description}>
          Create stunning designs and templates with our powerful AI tools
        </span>
      </div>
      <div className={styles.mainNav}>
        <div className={styles.navBox}></div>
      </div>
    </div>
  );
};

export default LandingPage;
