import styles from "./PageLoader.module.scss";

export default function PageLoader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderBar}></div>
    </div>
  );
}
