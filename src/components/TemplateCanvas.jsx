import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

function TemplateCanvas() {
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
            positions: { x: 16, y: 726 },
          },
          title: {
            font_family: "Free sans",
            font_style: "Bold",
            font_size: 44,
            alignment: "Bottom&Left",
            text: "title",
            positions: { x: 16, y: 710 },
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

    Object.entries(styles).forEach(([key, style]) => {
      console.log("hereeeeeee");
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
      console.log(textbox, "texbox");

      canvas.add(textbox);
      console.log(canvas, "canvas after");
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
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Editable Template Canvas</h2>
      <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={saveCanvasImage} style={{ marginRight: "10px" }}>
          Save as Image
        </button>
        <button onClick={saveLayoutJSON}>Save Layout JSON</button>
      </div>
    </div>
  );
}

export default TemplateCanvas;
