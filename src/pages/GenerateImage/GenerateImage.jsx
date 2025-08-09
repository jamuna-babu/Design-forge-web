import { LuSparkles, LuWandSparkles } from "react-icons/lu";
import styles from "./GenerateImage.module.scss";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useState } from "react";
import { Select } from "antd";
import {
  base64Mock,
  DEVICE_TYPE_OPTIONS,
  getDimensions,
  sampleImage,
  WIDGET_TYPE_OPTIONS,
} from "./constants";
import { useContextData, useContextDispatch } from "../../contextStore";
import { ContextActionHandlers } from "../../contextStore/actions";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import { APIService } from "../../services/service";
import PageLoader from "../../components/Loader/PageLoader";

const GenerateImage = () => {
  const [inputText, setInputText] = useState("");
  const [widgetType, setWidgetType] = useState(null);
  const [deviceType, setDeviceType] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useContextDispatch();
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

  const onGenerateClick = () => {
    setLoading(true);
    const { width, height } = getDimensions(widgetType, deviceType);
    APIService.generateImage({
      prompt: inputText,
      width,
      height,
    })
      .then((response) => {
        const { image } = response;
        dispatch(ContextActionHandlers.setBase64Image(image));
        dispatch(
          ContextActionHandlers.setImageOptions({
            widgetType,
            deviceType,
            dimensions: { width, height },
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const generateDisabled = !widgetType || !inputText || !deviceType;

  return (
    <div className={styles.generateImagePage}>
      {loading && <PageLoader />}
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
      {base64Image && <ImagePreview type="png" base64={base64Image} />}
    </div>
  );
};

export default GenerateImage;
