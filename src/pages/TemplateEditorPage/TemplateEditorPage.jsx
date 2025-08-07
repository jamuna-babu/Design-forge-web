import styles from "./TemplateEditorPage.module.scss";

const TemplateEditorPage = () => {
  return (
    <div className={styles.templateEditorPage}>
      <div className={styles.titleSection}>
        <div className={styles.title}>Template Editor</div>
        <div className={styles.description}>
          Customize your design with draggable text elements and styling options
        </div>
      </div>
    </div>
  );
};

export default TemplateEditorPage;
