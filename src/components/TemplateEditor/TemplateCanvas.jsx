import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styles from "../../pages/TemplateEditorPage/TemplateEditorPage.module.scss";

function TemplateCanvas({ onSelectText }) {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [layout, setLayout] = useState(null);

  // 1. Load layout data
  useEffect(() => {
    // Use real fetch here if needed
    const mockLayout = {
      background: "/Image.jpeg", // ✅ should be inside public/
      elements: [],
      widget: {
        name: "Widget 1",
        text_styles: {
          subtitle: {
            font_family: "Roboto",
            font_style: "Medium",
            font_size: 16,
            alignment: "Bottom&Left",
            text: "subtitle",
            positions: { x: 16, y: 625 },
          },
          title: {
            font_family: "Free sans",
            font_style: "Bold",
            font_size: 44,
            alignment: "Bottom&Left",
            text: "title\ntitle",
            positions: { x: 16, y: 651 },
          },
          description: {
            font_family: "Roboto",
            font_style: "Regular",
            font_size: 18,
            alignment: "Top&Left",
            text: "description",
            positions: { x: 16, y: 766 },
          },
        },
      },
    };

    setLayout(mockLayout);
  }, []);

  // 2. Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !layout) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 1000,
      selection: true,
    });

    fabricCanvas.current = canvas;

    // ✅ Set background image
    const bgUrl = layout.background || "/Image.jpeg";

    fabric.Image.fromURL(bgUrl, (img) => {
      if (!img) {
        console.error("Failed to load background image:", bgUrl);
        return;
      }

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });
    });

    // ✅ Add text styles from widget
    const styles = layout.widget?.text_styles || {};
    const textboxes = [];
    Object.entries(styles).forEach(([key, style]) => {
      const textbox = new fabric.Textbox(style.text || "", {
        left: style.positions?.x || 0,
        top: style.positions?.y || 0,
        fontSize: style.font_size || 20,
        fontFamily: style.font_family || "Arial",
        fontWeight:
          style.font_style?.toLowerCase() === "bold" ? "bold" : "normal",
        editable: true,
        fill: "#00000",
        width: 300,
      });
      canvas.add(textbox);
      textboxes.push(textbox);
    });
    canvas.on("selection:created", (e) => {
      const obj = e.selected[0];
      if (obj?.type === "textbox") {
        const props = {
          id: obj.customId,
          text: obj.text,
          fontSize: obj.fontSize,
          fontFamily: obj.fontFamily,
          fontWeight: obj.fontWeight,
          fill: obj.fill,
        };
        onSelectText && onSelectText(props);
      }
    });
    canvas.on("selection:updated", (e) => {
      const obj = e.selected[0];
      if (obj?.type === "textbox") {
        const props = {
          id: obj.customId,
          text: obj.text,
          fontSize: obj.fontSize,
          fontFamily: obj.fontFamily,
          fontWeight: obj.fontWeight,
          fill: obj.fill,
        };
        onSelectText && onSelectText(props);
      }
    });

    textboxes.forEach((textbox, index) => {
      let prevHeight = textbox.height;

      textbox.on("changed", () => {
        console.log("edit", textbox);
        textbox.initDimensions();
        const newHeight = textbox.height;

        if (newHeight !== prevHeight) {
          // const delta = newHeight - prevHeight;

          for (let i = index + 1; i < textboxes.length; i++) {
            const nextBox = textboxes[i];
            const prevBox = textboxes[i - 1];
            const spacing = 8;

            const expectedTop = prevBox.top + prevBox.height + spacing;
            nextBox.top = expectedTop;
            nextBox.setCoords();
          }

          prevHeight = newHeight;

          fabricCanvas.current.renderAll();
        }
      });
    });
    canvas.renderAll();

    return () => {
      canvas.dispose();
    };
  }, [layout]);

  // 3. Save canvas as PNG
  const saveCanvasImage = () => {
    const dataURL = fabricCanvas.current.toDataURL({
      format: "png",
      quality: 1.0,
    });

    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = dataURL;
    link.click();
  };

  // 4. Save canvas as JSON
  const saveLayoutJSON = () => {
    const layout = fabricCanvas.current.toJSON();
    const blob = new Blob([JSON.stringify(layout, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.download = "layout.json";
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.scrollContainer}>
        <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />
      </div>
      <div className={styles.templateButton}>
        <button onClick={saveCanvasImage} style={{ marginRight: "10px" }}>
          Save as Image
        </button>
        <button onClick={saveLayoutJSON}>Save Layout JSON</button>
      </div>
    </div>
  );
}

export default TemplateCanvas;
