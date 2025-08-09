import { useState } from "react";
import TemplateCanvas from "../../components/TemplateEditor/TemplateCanvas";
import TemplateStyleEditor from "../../components/TemplateEditor/TemplateStyleEditor";
import styles from "./TemplateEditorPage.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { useLocation, useSearchParams } from "react-router-dom";
import { APIService } from "../../services/service";
import { getDimensions } from "../GenerateImage/constants";
import { useContextData } from "../../contextStore";
import { WIDGET_IMGAES } from "../constants";

const TemplateEditorPage = () => {
  // temp
  const { allLayouts } = useContextData();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedTextProps, setSelectedTextProps] = useState(null);
  const [layout, setLayout] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const widgetType = searchParams.get("widgetType");
  const deviceType = searchParams.get("deviceType");
  const { width, height } = getDimensions(widgetType, deviceType);

  const page = location.state?.pageType;

  useState(() => {
    if (page === "layout") {
      setLayout(location.state?.text_styles);
      const image = WIDGET_IMGAES[widgetType][deviceType];
      setImgUrl(image);
    } else if (page === "image") {
      setLayout(location.state?.text_styles);
      setImgUrl(location?.state?.imageUrl);
      // temp
      setLayout(allLayouts[widgetType][deviceType]);
    }
  }, []);
  return (
    <div className={styles.templateEditorPage}>
      <div className={styles.titleSection}>
        <div className={styles.title}>Template Editor</div>
        <div className={styles.description}>
          Customize your design with draggable text elements and styling options
        </div>
      </div>
      <div className={styles.templateCanvasSection}>
        <div className={styles.templateCanvas}>
          <div className={styles.templateCanvasTitle}>
            <AiOutlineEdit /> Design Forge
          </div>
          <TemplateCanvas
            onSelectText={setSelectedTextProps}
            layout={layout}
            imageUrl={imgUrl}
            width={width}
            height={height}
          />
        </div>
        <TemplateStyleEditor selectedTextProps={selectedTextProps} />
      </div>
    </div>
  );
};

export default TemplateEditorPage;
