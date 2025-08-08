import { LuSparkles } from "react-icons/lu";
import ContentBox from "./ContentBox";
import styles from "./LandingPage.module.scss";
import { CiImageOn } from "react-icons/ci";
import { GrUpload } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import allLayOutJSON from "./LayoutMock.json";
import { useContextData, useContextDispatch } from "../../contextStore";
import { ContextActionHandlers } from "../../contextStore/actions";

const LandingPage = () => {
  const navigate = useNavigate();

  const dispatch = useContextDispatch();
  const { allLayouts } = useContextData();

  useEffect(() => {
    if (Object.entries(allLayouts)?.length === 0) {
      console.log(allLayouts);
      dispatch(ContextActionHandlers.setAllLayouts(allLayOutJSON));
    }
  }, []);
  return (
    <div className={styles.landingPage}>
      <div className={styles.welcomeContainer}>
        <span className={styles.title}>Welcome to Design Forge</span>
        <span className={styles.description}>
          Create stunning designs and templates with our powerful AI tools
        </span>
      </div>
      <div className={styles.mainNav}>
        <ContentBox
          icon={<LuSparkles />}
          title="Generate New Image"
          description="Create beautiful images with AI. Just describe what you want and let our AI bring it to life."
          gradientClass={styles.generateImageGradient}
          buttonProps={{
            label: "Generate Image",
            icon: <CiImageOn />,
            onButtonClick: () => navigate("/generate-image"),
          }}
        />
        <ContentBox
          icon={<GrUpload />}
          title="Upload Brand Guideline PDF"
          description="Upload your brand guidelines to create custom templates that match your brand identity."
          gradientClass={styles.uploadPdfGradient}
          buttonProps={{
            label: "Upload PDF",
            icon: <IoDocumentTextOutline />,
            onButtonClick: () => navigate("/upload-pdf"),
          }}
        />
      </div>
    </div>
  );
};

export default LandingPage;
