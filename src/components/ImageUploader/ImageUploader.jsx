import { useRef } from "react";
import styles from "./ImageUploader.module.scss";
import { GrUpload } from "react-icons/gr";

const ImageUploader = ({ maxSize = 5, onUpload, file = null }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const fileValue = e.target?.files?.[0];
    if (fileValue && validateFile(fileValue)) {
      onUpload(fileValue);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fileValue = e.dataTransfer.files[0];
    if (validateFile(fileValue)) {
      onUpload(fileValue);
    }
  };

  const validateFile = (fileValue) => {
    const isImage = /^image\/(jpeg|png|gif|webp)$/.test(fileValue.type);
    const isUnderMaxSize = fileValue.size <= maxSize * 1024 * 1024;

    if (!isImage) {
      alert("Only image files (JPEG, PNG, GIF, WebP) are allowed.");
      return false;
    }

    if (!isUnderMaxSize) {
      alert(`Image exceeds the ${maxSize}MB limit.`);
      return false;
    }

    return true;
  };

  return (
    <div
      className={styles.imageUploader}
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
          <p className={styles.text}>Drop your image here</p>
          <p className={styles.subtext}>
            Supports JPEG, PNG, GIF up to {maxSize}MB
          </p>
          <button
            className={styles.uploadButton}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Choose Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
