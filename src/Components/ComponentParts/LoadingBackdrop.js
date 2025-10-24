// LoadingBackdrop.js
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingBackdrop = ({ open = false, message = "Đang tải dữ liệu..." }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "all 0.3s ease",
      }}
      open={open}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          animation: "pulse 1.2s infinite ease-in-out",
        }}
      >
        <CircularProgress
          thickness={5}
          size={60}
          sx={{
            color: "#00e676",
            filter: "drop-shadow(0 0 8px rgba(0, 230, 118, 0.8))",
          }}
        />
        <span style={{ fontSize: "1.2rem", fontWeight: 500 }}>{message}</span>
      </div>
    </Backdrop>
  );
};

export default LoadingBackdrop;
