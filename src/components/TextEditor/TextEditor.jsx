import { useState } from "react";
import styles from "./TextEditor.module.scss";

function TextEditor(props) {
  const {
    label,
    value,
    onChange,
    maxCharacterLimit,
    placeholder,
    wrapperClass = "",
  } = props;
  const [characterCount, setCharacterCount] = useState(0);
  const onChangeHandler = (e) => {
    const val = e?.target?.value || "";
    if (val.length > maxCharacterLimit) return;
    onChange(val || "");
    setCharacterCount(val.length);
  };
  return (
    <div className={`${styles.textEditor} ${wrapperClass}`}>
      <span className={styles.editorLabel}>{label}</span>
      <textarea
        className={styles.textArea}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
      <div className={styles.characterCount}>
        {`${characterCount}/${maxCharacterLimit}`} characters
      </div>
    </div>
  );
}

export default TextEditor;
