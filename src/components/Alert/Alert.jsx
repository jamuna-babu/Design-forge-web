import { useEffect, useState } from "react";
import styles from "./Alert.module.scss"; // custom CSS
import { contextActions } from "../../contextStore/actions";

const ALERT_STYLES = {
  success: { bg: "#ecfdf5", border: "#6ee7b7", text: "#065f46", icon: "✅" },
  error: { bg: "#fef2f2", border: "#fca5a5", text: "#991b1b", icon: "❌" },
  warning: { bg: "#fffbeb", border: "#fcd34d", text: "#78350f", icon: "⚠️" },
  info: { bg: "#eff6ff", border: "#93c5fd", text: "#1e3a8a", icon: "ℹ️" },
};

export default function Alert({
  type = "info",
  message,
  timeout = 3000,
  onClose,
}) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!message) return;
    if (timeout) {
      const timer = setTimeout(() => {
        setVisible(false);
        contextActions.setAlertDetails({ type: "", message: "" });
        if (onClose) onClose();
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout, onClose, message]);

  if (!visible || !message || !type) return null;

  const style = ALERT_STYLES[type] || ALERT_STYLES.info;

  return (
    <div
      className={styles.alertContainer}
      style={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        color: style.text,
      }}
    >
      <span className={styles.alertIcon}>{style.icon}</span>
      <div className={styles.alertMessage}>{message}</div>
      <button
        className={styles.alertClose}
        onClick={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
      >
        ✖
      </button>
    </div>
  );
}
