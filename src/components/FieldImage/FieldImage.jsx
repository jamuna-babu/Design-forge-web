import React, { useState } from "react";

const FieldImage = () => {
  const [images, setImages] = useState({});
  const imageConfigs = [
    { name: "Mobile", width: 720, height: 1070 },
    { name: "Tab", width: 1024, height: 1366 },
    { name: "Fold", width: 1536, height: 2152 },
  ];
  const handleImageUpload = (e, config) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (img.width !== config.width || img.height !== config.height) {
        alert(
          `Invalid dimensions for ${config.name}. Expected ${config.width}x${config.height}, got ${img.width}x${img.height}`
        );
        return;
      }
      setImages((prev) => ({ ...prev, [config.name]: img.src }));
    };
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        border: "2px dashed #d0d0d0",
        borderRadius: "8px",
      }}
    >
      {imageConfigs.map((config) => (
        <div
          key={config.name}
          style={{
            textAlign: "center",
            borderRight: config.name !== "Fold" ? "1px solid #ddd" : "none",
            padding: "0 15px",
          }}
        >
          <label style={{ cursor: "pointer", display: "block" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src="https://icons.iconarchive.com/icons/iconsmind/outline/512/Add-Image-icon.png"
                alt="upload"
                style={{ width: "30px", height: "30px" }}
              />
              <span style={{ color: "#007BFF", textDecoration: "underline" }}>
                Click to upload
              </span>
              <span>or drag and drop</span>
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageUpload(e, config)}
            />
          </label>
          <p style={{ margin: "8px 0 0 0" }}>
            <strong>{config.name}:</strong> {config.width} * {config.height}
          </p>
          {images[config.name] && (
            <img
              src={images[config.name]}
              alt={config.name}
              style={{
                width: "60px",
                height: "auto",
                marginTop: "8px",
                borderRadius: "4px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default FieldImage;
