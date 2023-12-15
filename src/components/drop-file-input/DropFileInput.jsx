import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import "./drop-file-input.css";

import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../Assets/cloud-upload.png";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [isValidFile, setIsValidFile] = useState(true);


  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  // const onFileDrop = (e) => {
  //   const newFile = e.target.files[0];
  //   if (newFile) {
  //     const updatedList = [...fileList, newFile];
  //     setFileList(updatedList);
  //     props.onFileChange(updatedList);
  //   }
  // };
  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const fileExtension = newFile.name.split(".").pop().toLowerCase();

      // Add your allowed file extensions here
      const allowedExtensions = ["csv", "xlsx", "xlx"];

      if (allowedExtensions.includes(fileExtension)) {
        const updatedList = [...fileList, newFile];
        setFileList(updatedList);
        props.onFileChange(updatedList);
        setIsValidFile(true);
      } else {
        // Invalid file extension
        setIsValidFile(false);
        alert("Invalid file format. Please upload a .csv, .xlsx, or .xlx file.");
      }
    }
  };


  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <h6>Drag & Drop your files here</h6>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          {fileList.map((item, index) => (
            <div
              key={index}
              className="drop-file-preview__item"
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <h6
                  style={{
                    fontSize: "small",
                  }}
                >
                  {item.name}
                </h6>
              </div>
              <div
                style={{
                  flexDirection: "row",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => fileRemove(item)}
                  style={{ fontSize: "small" }}
                >
                  Remove
                </Button>
                {/* <Button
                  variant="contained"
                  onClick={() => {
                    console.log(
                      "🚀 ~ file: DropFileInput.jsx:112 ~ DropFileInput ~ item:",
                      item
                    );
                    props.uploadFile(item);
                  }}
                  style={{ fontSize: "small" }}
                >
                  Upload
                </Button> */}
                <Button
          variant="contained"
          onClick={() => {
            if (isValidFile) {
              console.log(
                "🚀 ~ file: DropFileInput.jsx:112 ~ DropFileInput ~ item:",
                item
              );
              props.uploadFile(item);
            } else {
              alert("Invalid file format. Please upload a .csv, .xlsx, or .xlx file.");
            }
          }}
          style={{ fontSize: "small" }}
          disabled={!isValidFile} 
        >
          Upload
        </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
