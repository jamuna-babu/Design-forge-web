import SideBar from "../../components/SideBar/SideBar";
import RouteSwitch from "../RouteSwitch/RouteSwitch";
// import { AiOutlineBars } from "react-icons/ai";
import styles from "./Base.module.scss";
import { useContextData, useContextStore } from "../../contextStore";
import PageLoader from "../../components/Loader/PageLoader";
import Alert from "../../components/Alert/Alert";

const BaseContainer = () => {
  // const [sideBarOpen, setSidebarOpen] = useState(false);
  const { loader, alert: { type, message } = {} } = useContextData();
  return (
    <div className={styles.baseContainer}>
      {loader && <PageLoader />}
      <Alert type={type} message={message} timeout={4000} />
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
