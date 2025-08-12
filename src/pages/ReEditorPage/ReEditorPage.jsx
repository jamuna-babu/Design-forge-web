import { useState } from "react";
import styles from "./ReEditorPage.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import { useLocation, useSearchParams } from "react-router-dom";
import { APIService } from "../../services/service";
import { getDimensions } from "../GenerateImage/constants";
import { useContextData } from "../../contextStore";
import { WIDGET_IMGAES } from "../constants";
import ReEditCanvas from "../../components/ReEditor/ReEditCanvas";
import StyleReEditor from "../../components/ReEditor/StyleReEditor";

const ReEditorPage = () => {
  console.log("inside reeditorrrrrrrrrrrrrr");
  // temp
  // const { allLayouts } = useContextData();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [selectedTextProps, setSelectedTextProps] = useState(null);
  const [layout, setLayout] = useState(null);
  // const [imgUrl, setImgUrl] = useState("");

  // const widgetType = searchParams.get("widgetType");
  // const deviceType = searchParams.get("deviceType");
  // const { width, height } = getDimensions(widgetType, deviceType);
  const { width, height, clean_background_base64, fabric_text_data } =
    location.state?.text_styles;

  useState(() => {
    // if (page === "layout") {
    //   setLayout(location.state?.text_styles);
    //   const image = WIDGET_IMGAES[widgetType][deviceType];
    //   setImgUrl(image);
    // } else if (page === "image") {
    //   setLayout(location.state?.text_styles);
    //   setImgUrl(location?.state?.imageUrl);
    //   // temp
    //   // setLayout(allLayouts[widgetType][deviceType]);
    // }
    console.log(location.state?.text_styles);
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
          <ReEditCanvas
            onSelectText={setSelectedTextProps}
            layout={fabric_text_data}
            imageUrl={`data:image/png;base64,${clean_background_base64}`}
            width={width}
            height={height}
          />
        </div>
        <StyleReEditor selectedTextProps={selectedTextProps} />
      </div>
    </div>
  );
};

export default ReEditorPage;
