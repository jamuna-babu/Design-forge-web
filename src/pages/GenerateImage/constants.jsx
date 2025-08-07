import { LuMonitor } from "react-icons/lu";
import styles from "./GenerateImage.module.scss";
import { PiLightningLight } from "react-icons/pi";
import { CiMobile2 } from "react-icons/ci";

export const DEVICE_WRAPPER_OPTIONS = [
  {
    value: "apple-device-mockup",
    label: (
      <span className={styles.dropDownOption}>
        <CiMobile2 className={styles.dropDownOptionIcon} />
        <span className={styles.dropDownOptionText}>Apple Device Mockup</span>
      </span>
    ),
  },
  {
    value: "samsung-device-mockup",
    label: (
      <span className={styles.dropDownOption}>
        <CiMobile2 className={styles.dropDownOptionIcon} />
        <span className={styles.dropDownOptionText}>Samsung Device Mockup</span>
      </span>
    ),
  },
  {
    value: "generic-device",
    label: (
      <span className={styles.dropDownOption}>
        <LuMonitor className={styles.dropDownOptionIcon} />
        <span className={styles.dropDownOptionText}>Generic Device</span>
      </span>
    ),
  },
  {
    value: "no-device-wrapper",
    label: (
      <span className={styles.dropDownOption}>
        <PiLightningLight className={styles.dropDownOptionIcon} />
        <span className={styles.dropDownOptionText}>No Device Wrapper</span>
      </span>
    ),
  },
];
