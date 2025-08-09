import { useRef } from "react";
import styles from "./PDFUploader.module.scss";
import { GrUpload } from "react-icons/gr";

const PDFUploader = (props) => {
  const { maxSize = 10, onUpload, file = null } = props;
  const fileInputRef = useRef(null);
  const handleDrop = (e) => {
    e.preventDefault();
    const fileValue = e.dataTransfer.files[0];
    if (validateFile(fileValue)) {
      onUpload(fileValue);
    }
  };
  const handleFileChange = (e) => {
    const fileValue = e?.target?.files?.[0];
    if (fileValue && validateFile(fileValue)) {
      onUpload(fileValue);
    }
  };
  const validateFile = (fileValue) => {
    const isPDF = fileValue.type === "application/pdf";
    const isUnderMaxSize = fileValue.size <= maxSize * 1024 * 1024;

    if (!isPDF) {
      alert("Only PDF files are allowed.");
      return false;
    }

    if (!isUnderMaxSize) {
      alert(`File exceeds the ${maxSize}MB limit.`);
      return false;
    }

    return true;
  };

  return (
    <div
      className={styles.pdfUploader}
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {file ? (
        <div className={styles.fileContainer}>{file?.name}</div>
      ) : (
        <div className={styles.uploadContainer}>
          <div className={styles.icon}>
            <GrUpload />
          </div>
          <p className={styles.text}>Drop your PDF here</p>
          <p className={styles.subtext}>Supports PDF files up to {maxSize}MB</p>
          <button
            className={styles.uploadButton}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={handleFileChange}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
