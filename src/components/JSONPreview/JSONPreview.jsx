import styles from "./JSONPreview.module.scss";
import { IoDocumentTextOutline } from "react-icons/io5";

const JSONPreview = ({ templateJSON = null }) => {
  return (
    <div className={styles.jsonPreview}>
      {templateJSON ? (
        <pre className={styles.contentBody}>
          {JSON.stringify(templateJSON, null, 2)}
        </pre>
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
