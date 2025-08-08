import { useState } from "react";
import TemplateCanvas from "../../components/TemplateEditor/TemplateCanvas";
import TemplateStyleEditor from "../../components/TemplateEditor/TemplateStyleEditor";
import styles from "./TemplateEditorPage.module.scss";

const TemplateEditorPage = () => {
  const [selectedTextProps, setSelectedTextProps] = useState(null);
  console.log(selectedTextProps);
  return (
    <div className={styles.templateEditorPage}>
      <div className={styles.titleSection}>
        <div className={styles.title}>Template Editor</div>
        <div className={styles.description}>
          Customize your design with draggable text elements and styling options
        </div>
      </div>
      <div className={styles.templateCanvasSection}>
        <div className={styles.templateCanvas}>
          <div className={styles.templateCanvasTitle}> Design Forge</div>
          <TemplateCanvas onSelectText={setSelectedTextProps} />
        </div>
        <TemplateStyleEditor selectedTextProps={selectedTextProps} />
      </div>
    </div>
  );
};

export default TemplateEditorPage;
