import styles from "../../pages/TemplateEditorPage/TemplateEditorPage.module.scss";
import { FaAlignCenter, FaAlignLeft, FaAlignRight } from "react-icons/fa";

const TemplateStyleEditor = ({ selectedTextProps }) => {
  const colorPalette = ["#ffffff", "#000000"];
  return (
    <div className={styles.templateStyleEditor}>
      <div className={styles.editorHeader}>Edit Text</div>

      {/* Title Text Input */}
      <label className={styles.label}>Title Text</label>
      <input
        type="text"
        placeholder="Title"
        maxLength={50}
        value={selectedTextProps?.text || ""}
        readOnly
        className={styles.input}
      />
      <div className={styles.charCount}>16/50 characters</div>

      {/* Font Family Dropdown */}
      <label className={styles.label}>Font Family</label>
      <select
        value={selectedTextProps?.fontFamily || ""}
        disabled
        className={styles.select}
      >
        <option>Inter</option>
        <option>Roboto</option>
        <option>Arial</option>
        <option>Free sans</option>
      </select>

      {/* Font Size Slider */}
      <label className={styles.label}>
        Font Size: {selectedTextProps?.fontSize || 0}px
      </label>
      <input
        type="range"
        min="10"
        max="72"
        value={selectedTextProps?.fontSize || 0}
        disabled
        className={styles.slider}
      />

      {/* Text Alignment */}
      <label className={styles.label}>Text Alignment</label>
      <div className={styles.alignmentButtons}>
        <button
          className={
            selectedTextProps?.textAlign === "left" ? styles.active : ""
          }
          disabled
        >
          <FaAlignLeft />
        </button>
        <button
          className={
            selectedTextProps?.textAlign === "center" ? styles.active : ""
          }
          disabled
        >
          <FaAlignCenter />
        </button>
        <button
          className={
            selectedTextProps?.textAlign === "right" ? styles.active : ""
          }
          disabled
        >
          <FaAlignRight />
        </button>
      </div>

      {/* Text Color */}
      <label className={styles.label}>Text Color</label>
      <div className={styles.colorPalette}>
        {colorPalette.map((col) => (
          <span
            key={col}
            style={{
              background: col,
              outline:
                selectedTextProps?.fontColor === col
                  ? "3px solid #000"
                  : "none",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
};
export default TemplateStyleEditor;
