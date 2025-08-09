import styles from "./JSONPreview.module.scss";
import { IoDocumentTextOutline } from "react-icons/io5";

const JSONPreview = ({ templateJSON = null }) => {
  return (
    <div className={styles.jsonPreview}>
      {templateJSON ? (
        <div className={styles.contentBody}>{templateJSON}</div>
      ) : (
        <div className={styles.emptyBody}>
          <IoDocumentTextOutline className={styles.icon} />
          <span>Upload a PDF to see preview</span>
        </div>
      )}
    </div>
  );
};

export default JSONPreview;
