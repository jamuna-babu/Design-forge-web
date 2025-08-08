import { useState } from "react";
import { useContextData } from "../../contextStore";
import styles from "./SavedTemplate.module.scss";

const SavedTemplate = () => {
  const { allLayouts } = useContextData();
  const [openSection, setOpenSection] = useState(null); // which section is open (banner or carousel)
  const [selectedItem, setSelectedItem] = useState(null); // the selected JSON object

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleItemClick = (section, item) => {
    const selectedObj = allLayouts[section][item];
    setSelectedItem(selectedObj);
    console.log("Selected object:", selectedObj); // You can use it anywhere in your code
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
          {Object.keys(allLayouts).map((section) => (
            <div
              key={section}
              style={{ border: "1px solid #ccc", marginBottom: "5px" }}
            >
              <div
                style={{
                  padding: "10px",
                  background: "#7688F2",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => handleSectionClick(section)}
              >
                {section}
              </div>

              {/* Sub-items (mobile, desktop) */}
              {openSection === section && (
                <div style={{ paddingLeft: "15px", background: "#f9f9f9" }}>
                  {Object.keys(allLayouts[section]).map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                      onClick={() => handleItemClick(section, item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Display selected object */}
          {selectedItem && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SavedTemplate;
