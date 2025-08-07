import { GrUpload } from "react-icons/gr";
import PDFUploader from "../../components/PDFUploader/PDFUploader";
import styles from "./CreateTemplatePage.module.scss";
import { useEffect, useState } from "react";
import { useContextDispatch } from "../../contextStore";
import { ContextActionHandlers } from "../../contextStore/actions";

const CreateTemplatePage = () => {
  const [file, setFile] = useState(null);
  const dispatch = useContextDispatch();
  useEffect(() => {
    if (!file) return;
    // API call to upload the file and extract design rules
    // dispatch(ContextActionHandlers.setTemplateJSON(response));
  }, [file]);
  return (
    <div className={styles.createTemplatePage}>
      <div className={styles.titleSection}>
        <div className={styles.title}>Upload Brand Guidelines</div>
        <div className={styles.description}>
          Upload your PDF guidelines to extract design rules and create custom
          templates
        </div>
      </div>
      <div className={styles.uploadPdfContainer}>
        <div className={styles.header}>
          <span className={styles.headerIcon}>
            <GrUpload />
          </span>
          <span className={styles.headerText}>Upload PDF Guidelines</span>
        </div>
        <div className={styles.pdfUploaderWrapper}>
          <PDFUploader maxSize={10} onUpload={(file) => setFile(file)} />
        </div>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
