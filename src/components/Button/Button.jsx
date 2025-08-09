import styles from "./Button.module.scss";
const Button = ({ btnName, handleClick, btnStyles }) => {
  return (
    <button
      className={styles.primaryButton}
      style={btnStyles}
      onClick={handleClick}
    >
      {btnName}
    </button>
  );
};
export default Button;
