import { GrUpload } from "react-icons/gr";
import PDFUploader from "../../components/PDFUploader/PDFUploader";
import styles from "./CreateTemplatePage.module.scss";
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

const CreateTemplatePage = () => {
  const [file, setFile] = useState(null);
  // const { templateJSON } = useContextData();
  const [templateJSON, setTemplateJSON] = useState(null);
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState({
    alertType: "",
    alertMessage: "",
  });

  const { alertMessge, alertType } = alert;
  const JSON = {
    Carousel: {
      mobile: {
        text_requirements: {
          combined_max_lines: 4,
          description_is_optional: true,
          subtitle_is_optional: true,
        },
        text_styles: {
          description: {
            alignment: "Top&Left",
            font_family: "Roboto",
            font_size: 18,
            font_style: "Regular",
            max_lines: 3,
            min_lines: 0,
            positions: { x: 16, y: 513 },
            text: "It should be located 300px above the title and 16px from left",
          },
          subtitle: {
            alignment: "Bottom&Left",
            font_family: "Roboto",
            font_size: 16,
            font_style: "Medium",
            max_lines: 1,
            min_lines: 0,
            positions: { x: 16, y: 726 },
            text: "1",
          },
          title: {
            alignment: "Bottom&Left",
            font_family: "Free Sans",
            font_size: 44,
            font_style: "Bold",
            max_lines: 3,
            min_lines: 1,
            positions: { x: 16, y: 726 },
            text: "LAXAIISHERE",
          },
        },
      },
    },
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    APIService.postPdfLayout(formData)
      .then((response) => {
        setLoading(false);
        setTemplateJSON(response);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [file]);
  const handleSaveTemplate = () => {
    APIService.postSaveTemplate(templateJSON)
      .then((response) => {
        setLoading(false);
        setIsAlert(true);
        setAlert({
          alertType: "success",
          alertMessage: "Template saved successfully. View in Saved template",
        });
      })
      .catch((error) => {
        setIsAlert(false);
        setAlert({
          alertType: "",
          alertMessage: "",
        });
        setLoading(false);
      });
  };
  return (
    <div className={styles.createTemplatePage}>
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
            <PDFUploader maxSize={10} onUpload={(file) => setFile(file)} />
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
