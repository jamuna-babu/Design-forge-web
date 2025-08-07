import { LuSparkles, LuWandSparkles } from "react-icons/lu";
import styles from "./GenerateImage.module.scss";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useState } from "react";
import { DEVICE_WRAPPER_OPTIONS } from "./constants";
import { Select } from "antd";

const GenerateImage = () => {
  const [inputText, setInputText] = useState("");
  const [deviceWrapper, setDeviceWrapper] = useState(null);

  const handleInputChange = (value) => setInputText(value);

  const onDeviceWrapperChange = (value = "") => {
    if (value === deviceWrapper) return;
    setDeviceWrapper(value);
  };

  const onGenerateClick = () => {};

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
        <div className={styles.deviceWrapperContainer}>
          <span className={styles.deviceWrapperLabel}>
            {`Choose Device Wrapper (Optional)`}
          </span>
          <Select
            placeholder="Select a Device Theme"
            onChange={onDeviceWrapperChange}
            value={deviceWrapper}
            options={DEVICE_WRAPPER_OPTIONS}
          />
        </div>
        <button className={styles.generateButton} onClick={onGenerateClick}>
          <LuSparkles className={styles.generateButtonIcon} />
          <span>Generate Image</span>
        </button>
      </div>
    </div>
  );
};

export default GenerateImage;
