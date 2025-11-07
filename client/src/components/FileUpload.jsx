import React, { useRef, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const FileUpload = ({ onFileChange }) => {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileChange(e);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          padding: "12px 18px",
          border: "1.5px solid #09274dff",
          borderRadius: 8,
          color: "#1a5a9aff",
          fontWeight: "bold",
          fontSize: "1.1rem",
          userSelect: "none",
        }}
      >
        <UploadFileIcon style={{ marginRight: 10 }} />
        {fileName || "Choose image"}
      </div>
    </div>
  );
};

export default FileUpload;
