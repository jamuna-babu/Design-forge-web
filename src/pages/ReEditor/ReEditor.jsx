import React, { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import { APIService } from "../../services/service";

function ReEditor() {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canvasDims, setCanvasDims] = useState({ width: 100, height: 200 }); // Default fallback size

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        selection: true,
      });
      setFabricCanvas(canvas);
    }
  }, [canvasRef, fabricCanvas]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !fabricCanvas) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await APIService.postEditImage(formData);
      console.log("API response:", response);

      const { width, height, clean_background_base64, fabric_text_data } =
        response;

      setCanvasDims({ width, height });
      fabricCanvas.setWidth(width);

      fabricCanvas.setHeight(height);

      const imgDataUrl = `data:image/png;base64,${clean_background_base64}`;

      fabric.Image.fromURL(imgDataUrl, (img) => {
        if (!img) {
          console.error("Failed to load image.");
          return;
        }

        img.set({
          scaleX: 1,
          scaleY: 1,
          width,
          height,
        });

        fabricCanvas.setBackgroundImage(
          img,
          fabricCanvas.renderAll.bind(fabricCanvas)
        );

        fabric_text_data.forEach((item) => {
          const textbox = new fabric.Textbox(item.text, {
            left: item.left,
            top: item.top,
            width: item.width,
            height: item.height,
            fontFamily: item.fontFamily,
            fontSize: item.fontSize,
            fill: "black",
            editable: true,
          });
          fabricCanvas.add(textbox);
        });
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {console.log(canvasDims.width, canvasDims.height, "width and height")}
      <canvas
        ref={canvasRef}
        width={canvasDims.width}
        height={canvasDims.height}
      />
    </div>
  );
}

export default ReEditor;
