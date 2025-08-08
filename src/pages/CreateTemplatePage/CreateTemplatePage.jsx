import { GrUpload } from "react-icons/gr";
import PDFUploader from "../../components/PDFUploader/PDFUploader";
import styles from "./CreateTemplatePage.module.scss";
import { useEffect, useState } from "react";
import { useContextData, useContextDispatch } from "../../contextStore";
import { ContextActionHandlers } from "../../contextStore/actions";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import JSONPreview from "../../components/JSONPreview/JSONPreview";

const CreateTemplatePage = () => {
  const [file, setFile] = useState(null);
  const { templateJSON } = useContextData();
  const dispatch = useContextDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!file) return;
    // API call to upload the file and extract design rules and dispatch the response
    // dispatch(ContextActionHandlers.setTemplateJSON(response));
    // navigate("/template-editor");
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
      <div className={styles.contentSection}>
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
        <div className={styles.jsonPreviewContainer}>
          <div className={styles.header}>
            <LuEye />
            <span>JSON Preview</span>
          </div>
          <JSONPreview templateJSON={templateJSON} />
        </div>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
