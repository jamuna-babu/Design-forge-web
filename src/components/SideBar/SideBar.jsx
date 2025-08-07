import styles from "./SideBar.module.scss";
import { SIDE_BAR_OPTIONS } from "./sideBarConstants";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const handleNavigation = (value) => {
    navigate(`${value}`);
  };
  return (
    <div className={styles.sideBar}>
      <div className={styles.titleContainer}>
        <span className={styles.titleIcon}>DF</span>
        <span className={styles.titleText}>DesignForge</span>
      </div>
      <div className={styles.navContainer}>
        {SIDE_BAR_OPTIONS.map(({ value, label, icon, route }) => {
          return (
            <div
              key={value}
              className={styles.navItem}
              onClick={() => handleNavigation(route)}
            >
              <span className={styles.navIcon}>{icon}</span>
              <span className={styles.navLabel}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
