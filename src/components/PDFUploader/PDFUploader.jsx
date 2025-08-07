import { useRef } from "react";
import styles from "./PDFUploader.module.scss";
import { GrUpload } from "react-icons/gr";

const PDFUploader = (props) => {
  const { maxSize = 10, onUpload } = props;
  const fileInputRef = useRef(null);
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      onUpload(file);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onUpload(file);
    }
  };
  const validateFile = (file) => {
    const isPDF = file.type === "application/pdf";
    const isUnderMaxSize = file.size <= maxSize * 1024 * 1024;

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
      />
    </div>
  );
};

export default PDFUploader;
