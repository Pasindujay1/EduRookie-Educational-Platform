import { useEffect, useRef } from "react";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import "./Common.css"; // Import custom CSS for additional styling

const UploadWidget = ({ onUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "diiyul5rg",
        uploadPreset: "eduRookie",
      },
      (error, result) => {
        if (result.event === "success") {
          console.log(result);
          console.log(result.info.url);
          onUpload(result.info.url);
        }
      }
    );
  }, []);

  return (
    <div className='upload-button-container'>
      <CloudUploadRoundedIcon
        className='upload-button-icon'
        onClick={() => widgetRef.current.open()}
      />
      <span className='upload-button-text'>Upload</span>
    </div>
  );
};

export default UploadWidget;
