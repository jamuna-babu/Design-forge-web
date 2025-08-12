import { LuSparkles, LuWandSparkles } from "react-icons/lu";
import styles from "./GenerateImage.module.scss";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useState } from "react";
import { message, Select } from "antd";
import {
  DEVICE_TYPE_OPTIONS,
  getDimensions,
  WIDGET_TYPE_OPTIONS,
} from "./constants";
import { useContextData } from "../../contextStore";
import { contextActions } from "../../contextStore/actions";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import { APIService } from "../../services/service";
import { useNavigate } from "react-router-dom";

const GenerateImage = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [widgetType, setWidgetType] = useState(null);
  const [deviceType, setDeviceType] = useState(null);
  const [isLayout, setIsLayout] = useState(false);
  const [layout, setLayout] = useState(null);
  const { base64Image } = useContextData();
  const handleInputChange = (value) => setInputText(value);

  const onWidgetTypeChange = (value = "") => {
    if (value === widgetType) return;
    setWidgetType(value);
  };
  const onDeviceTypeChange = (value = "") => {
    if (value === deviceType) return;
    setDeviceType(value);
  };

  const fetchLayout = () => {
    contextActions.setLoader(true);
    APIService.getAllLayouts()
      .then((response) => {
        if (Object.keys(response)?.length > 0) {
          const hasWidgetType = response.hasOwnProperty(widgetType);
          const hasDeviceType =
            hasWidgetType && response[widgetType].hasOwnProperty(deviceType);
          if (hasWidgetType && hasDeviceType) {
            setIsLayout(true);
            setLayout(response[widgetType][deviceType]?.text_styles);
          } else {
            setIsLayout(false);
          }
        }
      })
      .catch(() => {
        contextActions.setAlertDetails({
          type: "error",
          message: "Failed to fetch layout. Please try again.",
        });
      })
      .finally(() => contextActions.setLoader(false));
  };
  const onGenerateClick = () => {
    const { width, height } = getDimensions(widgetType, deviceType);
    contextActions.setLoader(true);
    APIService.generateImage({
      prompt: inputText,
      width,
      height,
    })
      .then((response) => {
        const { image } = response;
        contextActions.setBase64Image(image);
        contextActions.setImageOptions({
          widgetType,
          deviceType,
          dimensions: { width, height },
        });
        contextActions.setAlertDetails({
          type: "success",
          message: "Image generated successfully!",
        });
        fetchLayout();
      })
      .finally(() => contextActions.setLoader(false));
  };

  const handleEditClick = () => {
    navigate(
      `/template-editor?widgetType=${widgetType}&deviceType=${deviceType}`,
      {
        state: {
          text_styles: layout,

          pageType: "image",
        },
      }
    );
  };

  const generateDisabled = !widgetType || !inputText || !deviceType;

  return (
    <div className={styles.generateImagePage}>
      <div className={styles.titleContainer}>
        <span className={styles.titleIcon}>
          <LuSparkles />
        </span>
        <span className={styles.titleText}>Generate AI Images</span>
        <span className={styles.description}>
          Describe your vision and let our AI bring it to life
        </span>
      </div>
      <div className={styles.promptContainer}>
        <div className={styles.header}>
          <LuWandSparkles style={{ fontSize: "2rem" }} />
          <span>Create your image</span>
        </div>
        <TextEditor
          wrapperClass={styles.textEditorWrapper}
          value={inputText}
          onChange={handleInputChange}
          maxCharacterLimit={500}
          label="Describe your image"
          placeholder="e.g., A serene landscape with mountains and a river, a sunset in the background, and a clear blue sky."
        />
        <div className={styles.dropdownContainer}>
          <span className={styles.dropdownLabel}>{`Choose Widget Type`}</span>
          <Select
            placeholder="Select a Widget Type"
            onChange={onWidgetTypeChange}
            value={widgetType}
            options={WIDGET_TYPE_OPTIONS}
          />
        </div>
        {!!widgetType && (
          <div className={styles.dropdownContainer}>
            <span className={styles.dropdownLabel}>{`Choose Device Type`}</span>
            <Select
              placeholder="Select a Widget Type"
              onChange={onDeviceTypeChange}
              value={deviceType}
              options={DEVICE_TYPE_OPTIONS}
            />
          </div>
        )}
        <button
          className={`${styles.generateButton} ${
            generateDisabled ? styles.disabledButton : ""
          }`}
          onClick={onGenerateClick}
        >
          <LuSparkles className={styles.generateButtonIcon} />
          <span>Generate Image</span>
        </button>
      </div>
      {base64Image && (
        <ImagePreview
          type="png"
          base64={base64Image}
          isLayout={isLayout}
          handleEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default GenerateImage;
