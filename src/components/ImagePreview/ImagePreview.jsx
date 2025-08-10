import styles from "./ImagePreview.module.scss";
import { CiImageOn } from "react-icons/ci";
import { downloadBase64Image } from "../../pages/GenerateImage/constants";
import Button from "../Button/Button";

const ImagePreview = ({ type, base64, isLayout, handleEditClick }) => {
  const onDownloadClick = () => {
    downloadBase64Image(base64);
  };
  return (
    <div className={styles.imagePreview}>
      <div className={styles.imagePreviewLabel}>
        <CiImageOn className={styles.titleIcon} />
        <span>Image Preview</span>
      </div>
      <div className={styles.imagePreviewContent}>
        <img src={`data:image/${type};base64,${base64}`} alt="Generated" />
      </div>
      <div className={styles.buttonsContainer}>
        <Button btnName={"Download"} handleClick={onDownloadClick} />
        {isLayout && (
          <Button
            btnName={"Edit"}
            btnStyles={{ marginLeft: "20px" }}
            handleClick={handleEditClick}
          />
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
