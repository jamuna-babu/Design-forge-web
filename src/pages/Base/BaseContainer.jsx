import React, { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import RouteSwitch from "../RouteSwitch/RouteSwitch";
// import { AiOutlineBars } from "react-icons/ai";
import styles from "./Base.module.scss";
import { useContextStore } from "../../contextStore";

const BaseContainer = () => {
  // const [sideBarOpen, setSidebarOpen] = useState(false);
  return (
    <div className={styles.baseContainer}>
      <SideBar />
      <div className={styles.mainContainer}>
        {/* <div
          className={styles.drawerIcon}
          onClick={() => setSidebarOpen(!sideBarOpen)}
        >
          <AiOutlineBars style={{ fontSize: "1rem" }} />
        </div> */}
        <RouteSwitch />
      </div>
    </div>
  );
};

export default useContextStore(BaseContainer);
