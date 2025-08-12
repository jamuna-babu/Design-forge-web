import React from "react";
import {
  FilePdfOutlined,
  ArrowRightOutlined,
  CodeOutlined,
} from "@ant-design/icons";

export default function PageLoader() {
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.3);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 0.6;
            }
          }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          marginLeft: "100px",
          alignItems: "center",
          gap: 40,
          pointerEvents: "none", // So it doesn't block clicks
          background: "transparent", // No background color
          userSelect: "none",
          zIndex: 9999, // On top of everything
          fontSize: 60,
          color: "#1890ff",
        }}
      >
        <FilePdfOutlined style={{ color: "#d93025" }} />
        <ArrowRightOutlined
          style={{
            animation: "pulse 2s infinite",
            color: "#555",
          }}
        />
        <CodeOutlined style={{ color: "#52c41a" }} />
      </div>
    </>
  );
}
