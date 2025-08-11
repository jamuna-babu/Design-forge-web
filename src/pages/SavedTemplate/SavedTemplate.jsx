import { useEffect, useState } from "react";
import styles from "./SavedTemplate.module.scss";
import { capitalizeFirstLetter } from "../utils";
import { useNavigate } from "react-router-dom";
import { APIService } from "../../services/service";
import Button from "../../components/Button/Button";
import { LuEye } from "react-icons/lu";

const SavedTemplate = () => {
  const navigate = useNavigate();
  const [widgetType, setWidgetType] = useState(null);
  const [deviceType, setDeviceType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [allLayouts, setAllLayouts] = useState({});

  useEffect(() => {
    APIService.getAallLayouts()
      .then((response) => {
        setAllLayouts(response);
      })
      .catch((error) => {});
  }, []);

  const handleSectionClick = (widget) => {
    setWidgetType(widgetType === widget ? null : widget);
    setSelectedItem(null);
  };

  const handleItemClick = (widget, device) => {
    const selectedObj = allLayouts[widget][device];
    setSelectedItem(selectedObj);
    setWidgetType(widget);
    setDeviceType(device);
  };

  const handleUseTemplate = () => {
    navigate(
      `/template-editor?widgetType=${widgetType}&deviceType=${deviceType}`,
      {
        state: {
          text_styles: selectedItem,
          pageType: "layout",
        },
      }
    );
  };

  return (
    <div className={styles.savedTemplatePage}>
      <div className={styles.titleSection}>
        <div className={styles.title}>Saved Templates</div>
        <div className={styles.description}>
          Choose the template of your preference
        </div>
      </div>
      <div className={styles.widgetListContainer}>
        <div style={{ width: "300px", fontFamily: "sans-serif" }}>
          {/* Loop through the main keys (banner, carousel) */}
          {Object.keys(allLayouts)?.length === 0 ? (
            <center>No Saved Templates</center>
          ) : (
            <>
              {Object.keys(allLayouts).map((widget) => (
                <div
                  key={widget}
                  style={{ border: "1px solid #ccc", marginBottom: "5px" }}
                >
                  <div
                    style={{
                      padding: "10px",
                      background: "#7688F2",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => handleSectionClick(widget)}
                  >
                    {capitalizeFirstLetter(widget)}
                  </div>

                  {/* Sub-items (mobile, desktop) */}
                  {widgetType === widget && (
                    <div style={{ paddingLeft: "15px", background: "#f9f9f9" }}>
                      {Object.keys(allLayouts[widget]).map((device) => (
                        <div
                          key={device}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                          }}
                          onClick={() => handleItemClick(widget, device)}
                        >
                          {capitalizeFirstLetter(device)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Display selected object */}
              {selectedItem && (
                <div className={styles.jsonPreviewContainer}>
                  <div className={styles.header}>
                    <LuEye />
                    <span>JSON Preview</span>
                  </div>
                  <div className={styles.jsonContent}>
                    <pre>{JSON.stringify(selectedItem, null, 2)}</pre>

                    <Button
                      btnName={"Use Template"}
                      handleClick={handleUseTemplate}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default SavedTemplate;
