import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styles from "../../pages/TemplateEditorPage/TemplateEditorPage.module.scss";
import Button from "../Button/Button";

function TemplateCanvas({ onSelectText, layout, imageUrl, width, height }) {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [imgUrl, setImgUrl] = useState(imageUrl || "/Image.jpeg");

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !layout) return;

    let isMounted = true;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 1000,
      selection: true,
    });

    fabricCanvas.current = canvas;

    // ✅ Set background image
    const bgUrl = imgUrl;

    fabric.Image.fromURL(bgUrl, (img) => {
      if (!isMounted) return;
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
    const styles = layout?.text_styles || {};
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
      isMounted = false;
      canvas.dispose();
    };
  }, [layout, imgUrl]);

  // 3. Save canvas as PNG
  const saveCanvasImage = () => {
    const dataURL = fabricCanvas.current.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = dataURL;
    link.click();
  };

  // 4. Save canvas as JSON
  // const saveLayoutJSON = () => {
  //   const layout = fabricCanvas.current.toJSON();
  //   const blob = new Blob([JSON.stringify(layout, null, 2)], {
  //     type: "application/json",
  //   });

  //   const link = document.createElement("a");
  //   link.download = "layout.json";
  //   link.href = URL.createObjectURL(blob);
  //   link.click();
  // };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const img = new Image();
      img.onload = () => {
        if (img.width === width && img.height === height) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            setImgUrl(ev.target.result); // Base64 URL
          };
          reader.readAsDataURL(file);
        } else {
          alert(`Image must be exactly ${width}x${height} pixels.`);
        }
      };
      img.src = URL.createObjectURL(file);
    };
    input.click();
  };

  return (
    <div className={styles.imageContainer}>
      <div className={styles.scrollContainer}>
        <canvas ref={canvasRef} style={{ border: "1px solid #ccc" }} />
      </div>
      <div className={styles.templateButton}>
        {/* <button onClick={saveCanvasImage} style={{ marginRight: "10px" }}>
          Save as Image
        </button> */}
        <Button btnName={"Save as Image"} handleClick={saveCanvasImage} />
        <Button
          btnName={"Change Image"}
          handleClick={handleImageUpload}
          btnStyles={{ marginLeft: "20px" }}
        />
        {/* <button onClick={handleImageUpload}>Change Image</button> */}
        {/* <button onClick={saveLayoutJSON}>Save Layout JSON</button> */}
      </div>
    </div>
  );
}

export default TemplateCanvas;
