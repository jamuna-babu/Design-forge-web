import React from "react";
import styles from "./ImagePreview.module.scss";
import { CiImageOn } from "react-icons/ci";

const ImagePreview = ({ type, base64 }) => {
  return (
    <div className={styles.imagePreview}>
      <div className={styles.imagePreviewLabel}>
        <CiImageOn className={styles.titleIcon} />
        <span>Image Preview</span>
      </div>
      <div className={styles.imagePreviewContent}>
        <img src={`data:image/${type};base64,${base64}`} alt="Generated" />
      </div>
    </div>
  );
};

export default ImagePreview;
