import styles from "./LandingPage.module.scss";

const ContentBox = (props) => {
  const { icon, title, description, buttonProps, gradientClass } = props;
  const { label, icon: buttonIcon, onButtonClick } = buttonProps;
  return (
    <div className={styles.contentBox}>
      <div className={`${styles.iconSection} ${gradientClass}`}>{icon}</div>
      <span className={styles.titleSection}>{title}</span>
      <span className={styles.description}>{description}</span>
      <button
        className={`${styles.actionButton} ${gradientClass}`}
        onClick={onButtonClick}
      >
        <span className={styles.buttonIcon}>{buttonIcon}</span>
        <span className={styles.buttonText}>{label}</span>
      </button>
    </div>
  );
};

export default ContentBox;
