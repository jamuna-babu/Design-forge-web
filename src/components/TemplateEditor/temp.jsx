import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import styles from "../../pages/TemplateEditorPage/TemplateEditorPage.module.scss";
import Button from "../Button/Button";
import "/home/d2c-jamuna-babu/Documents/DesignForge/frontend/Design-forge-web/src/fonts.css";
import { getNumericWeight } from "../../pages/utils";

function TemplateCanvas({ onSelectText, layout, imageUrl, width, height }) {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [imgUrl, setImgUrl] = useState(imageUrl || "/Image.jpeg");

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current || !layout) return;

    let isMounted = true;
    document.fonts.ready.then(() => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: layout?.image_width,
        height: layout?.image_height,
        selection: true,
      });

      fabricCanvas.current = canvas;

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

      const styles = layout?.text_styles || {};
      const textboxes = [];
      Object.entries(styles).forEach(([key, style]) => {
        console.log(style, "styleee");
        const textbox = new fabric.Textbox(style.text || "", {
          left: style.positions?.x || 0,
          top: style.positions?.y || 0,
          fontSize:
            style.font_size <= 40 ? style.font_size + 10 : style.font_size,
          fontFamily: style.font_family == "FreeSans" ? "FreeSans" : "Roboto",
          fontWeight: style.font_style,
          editable: true,
          fill: "#00000",
          width: 300,
        });
        canvas.add(textbox);
        textboxes.push(textbox);
      });

      // When selection is created (first time an object is selected)
      canvas.on("selection:created", (e) => {
        const obj = e.selected[0];
        console.log(obj, "selection created");

        if (obj?.type === "textbox") {
          const props = {
            id: obj.customId,
            text: obj.text, // Latest text value
            fontSize: obj.fontSize,
            fontFamily: obj.fontFamily,
            fontWeight: obj.fontWeight,
            fill: obj.fill,
          };
          console.log(props, "updated from created");
          onSelectText && onSelectText(props);
        }
      });

      // When selection is updated (editing an existing object)
      canvas.on("selection:updated", (e) => {
        const obj = e.selected[0];
        console.log(obj, "selection updated");

        if (obj?.type === "textbox") {
          // Ensure the object properties are up-to-date
          canvas.renderAll(); // Re-render the canvas to apply any changes

          const props = {
            id: obj.customId,
            text: obj.text, // This should reflect the latest value
            fontSize: obj.fontSize,
            fontFamily: obj.fontFamily,
            fontWeight: obj.fontWeight,
            fill: obj.fill,
          };

          console.log(props, "updated from selection update");
          onSelectText && onSelectText(props);
        }
      });

      // canvas.on("selection:created", (e) => {
      //   const obj = e.selected[0];
      //   console.log(obj, "styleee created");
      //   if (obj?.type === "textbox") {
      //     const props = {
      //       id: obj.customId,
      //       text: obj.text,
      //       fontSize: obj.fontSize,
      //       fontFamily: obj.fontFamily,
      //       fontWeight: obj.fontWeight,
      //       fill: obj.fill,
      //     };
      //     console.log(props, "updateddd");
      //     onSelectText(props);
      //   }
      // });
      // canvas.on("selection:updated", (e) => {
      //   const obj = e.selected[0];
      //   console.log(obj, "selection updated");
      //   if (obj?.type === "textbox") {
      //     const props = {
      //       id: obj.customId,
      //       text: obj.text,
      //       fontSize: obj.fontSize,
      //       fontFamily: obj.fontFamily,
      //       fontWeight: obj.fontWeight,
      //       fill: obj.fill,
      //     };
      //     onSelectText(props);
      //   }
      // });

      // const spacing = 8;

      // textboxes.forEach((textbox) => {
      //   textbox.on("changed", () => {
      //     textbox.initDimensions();

      //     const sortedBoxes = [...textboxes].sort((a, b) => a.top - b.top);

      //     for (let i = 1; i < sortedBoxes.length; i++) {
      //       const prevBox = sortedBoxes[i - 1];
      //       const currentBox = sortedBoxes[i];

      //       const requiredTop = prevBox.top + prevBox.height + spacing;

      //       if (currentBox.top !== requiredTop) {
      //         currentBox.top = requiredTop;
      //         currentBox.setCoords();
      //       }
      //     }

      //     // canvas.renderAll();
      //   });
      // });
      canvas.renderAll();

      return () => {
        isMounted = false;
        canvas.dispose();
      };
    });
  }, [layout, imgUrl]);

  // const saveCanvasImage = () => {
  //   const layoutWidth = layout?.image_width;
  //   const layoutHeight = layout?.image_height;

  //   if (!layoutWidth || !layoutHeight) {
  //     alert("Layout dimensions are missing.");
  //     return;
  //   }

  //   const currentCanvas = fabricCanvas.current;
  //   console.log(currentCanvas, "currentcanvas");

  //   // Calculate multiplier to match layout dimensions
  //   // const multiplier = layoutWidth / currentCanvas.getWidth();

  //   const canvasWidth = currentCanvas.getWidth();
  //   const canvasHeight = currentCanvas.getHeight();

  //   // Calculate multipliers for width and height
  //   const widthMultiplier = layoutWidth / canvasWidth;
  //   const heightMultiplier = layoutHeight / canvasHeight;

  //   // Use the smaller multiplier to preserve aspect ratio and avoid distortion
  //   const multiplier = Math.min(widthMultiplier, heightMultiplier);

  //   const dataURL = currentCanvas.toDataURL({
  //     format: "png",
  //     quality: 3.0,
  //     multiplier: 1,
  //   });

  //   const link = document.createElement("a");
  //   link.download = "canvas.png";
  //   link.href = dataURL;
  //   link.click();
  // };

  // const saveCanvasImage = () => {
  //   const layoutWidth = layout?.image_width;
  //   const layoutHeight = layout?.image_height;

  //   if (!layoutWidth || !layoutHeight) {
  //     alert("Layout dimensions are missing.");
  //     return;
  //   }

  //   const currentCanvas = fabricCanvas.current;

  //   // Log canvas details before saving
  //   console.log("Logging before saving canvas image:");

  //   // Log textboxes and their properties
  //   fabricCanvas.current.getObjects("textbox").forEach((textbox) => {
  //     console.log("Textbox Details:", {
  //       text: textbox.text,
  //       left: textbox.left,
  //       top: textbox.top,
  //       fontSize: textbox.fontSize,
  //       fontFamily: textbox.fontFamily,
  //       fontWeight: textbox.fontWeight,
  //       fill: textbox.fill,
  //     });
  //   });

  //   // Log background image details
  //   const bgImage = currentCanvas.backgroundImage;
  //   if (bgImage) {
  //     console.log("Background Image:", bgImage.getSrc()); // Log the image URL or source
  //   } else {
  //     console.log("No background image set.");
  //   }

  //   // Log all objects on the canvas
  //   console.log("Canvas Objects:", currentCanvas.getObjects());

  //   // Log canvas dimensions
  //   console.log("Canvas Width:", currentCanvas.getWidth());
  //   console.log("Canvas Height:", currentCanvas.getHeight());

  //   // Render the canvas to ensure all changes are reflected
  //   currentCanvas.renderAll();

  //   const canvasWidth = currentCanvas.getWidth();
  //   const canvasHeight = currentCanvas.getHeight();

  //   // Calculate multipliers for width and height to match layout dimensions
  //   const widthMultiplier = layoutWidth / canvasWidth;
  //   const heightMultiplier = layoutHeight / canvasHeight;

  //   // Use the smaller multiplier to preserve aspect ratio and avoid distortion
  //   const multiplier = Math.min(widthMultiplier, heightMultiplier);

  //   // Log the data URL for preview
  //   const dataURL = currentCanvas.toDataURL({
  //     format: "png",
  //     quality: 3.0,
  //     multiplier: multiplier,
  //   });
  //   console.log("Generated Data URL (Preview):", dataURL);

  //   // Trigger the download
  //   const link = document.createElement("a");
  //   link.download = "canvas.png";
  //   link.href = dataURL;
  //   link.click();
  // };

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
        <Button btnName={"Save as Image"} handleClick={saveCanvasImage} />
        <Button
          btnName={"Change Image"}
          handleClick={handleImageUpload}
          btnStyles={{ marginLeft: "20px" }}
        />
      </div>
    </div>
  );
}

export default TemplateCanvas;
