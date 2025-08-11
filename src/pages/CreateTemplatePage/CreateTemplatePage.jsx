import { GrUpload } from "react-icons/gr";
import PDFUploader from "../../components/PDFUploader/PDFUploader";
import styles from "./CreateTemplatePage.module.scss";
import { useEffect, useState } from "react";
import { contextActions } from "../../contextStore/actions";
import { LuEye } from "react-icons/lu";
import JSONPreview from "../../components/JSONPreview/JSONPreview";
import { APIService } from "../../services/service";
import Button from "../../components/Button/Button";

const CreateTemplatePage = () => {
  const [file, setFile] = useState(null);
  const [templateJSON, setTemplateJSON] = useState(null);

  useEffect(() => {
    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);
    contextActions.setLoader(true);
    contextActions.setAlertDetails({
      type: "success",
      message: "Processing PDF, please wait...",
    });
    APIService.postPdfLayout(formData)
      .then((response) => {
        setTemplateJSON(response);
      })
      .catch(() =>
        contextActions.setAlertDetails({
          type: "error",
          message: "Failed to process PDF. Please try again.",
        })
      )
      .finally(() => contextActions.setLoader(false));
  }, [file]);
  const handleSaveTemplate = () => {
    APIService.postSaveTemplate(templateJSON)
      .then(() => {
        contextActions.setAlertDetails({
          type: "success",
          message: "Template saved successfully. View in Saved template",
        });
      })
      .catch(() =>
        contextActions.setAlertDetails({
          type: "error",
          message: "Failed to save template. Please try again.",
        })
      )
      .finally(() => contextActions.setLoader(false));
  };

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
            <PDFUploader
              maxSize={10}
              onUpload={(file) => setFile(file)}
              file={file}
            />
          </div>
        </div>
        <div className={styles.jsonPreviewContainer}>
          <div className={styles.header}>
            <LuEye />
            <span>JSON Preview</span>
          </div>

          <JSONPreview templateJSON={templateJSON} />
          <div className={styles.jsonPreviewContent}>
            {templateJSON && (
              <Button
                btnName={"Save Template"}
                handleClick={handleSaveTemplate}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTemplatePage;
