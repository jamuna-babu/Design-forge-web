import { GrUpload } from "react-icons/gr";
import styles from "./UploadImagePage.module.scss";
import { useEffect, useState } from "react";
import { useContextData, useContextDispatch } from "../../contextStore";
import { ContextActionHandlers } from "../../contextStore/actions";
import { useNavigate } from "react-router-dom";
import { LuEye } from "react-icons/lu";
import JSONPreview from "../../components/JSONPreview/JSONPreview";
import { APIService } from "../../services/service";
import PageLoader from "../../components/Loader/PageLoader";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import ImageUploader from "../../components/ImageUploader/ImageUploader";

const UploadImagePage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState({
    alertType: "",
    alertMessage: "",
  });

  const { alertMessge, alertType } = alert;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    APIService.postEditImage(formData)
      .then((response) => {
        setLoading(false);
        console.log("hereeeeeeeeeeeeeeee");
        navigate("/re-edit", {
          state: {
            text_styles: response,
          },
        });
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [file]);
  console.log(styles, "styles");

  return (
    <div className={styles.UploadImagePage}>
      {loading && <PageLoader />}
      {isAlert && (
        <Alert type={alertType} message={alertMessge} timeout={4000} />
      )}
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
            <ImageUploader
              maxSize={10}
              onUpload={(file) => setFile(file)}
              file={file}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImagePage;
