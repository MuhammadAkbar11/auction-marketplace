import React from "react";

const useSingleImageUploader = ({ defaultImage }) => {
  const [image, setImage] = React.useState(defaultImage || null);

  const handleFile = files => {
    const newFiles = [...files].map(file => {
      return {
        filename: file.name,
        file: file,
        url: URL.createObjectURL(file),
      };
    });
    setImage(newFiles[0]);
  };

  const handleReset = () => setImage(null);

  return { image, handleFile, handleReset };
};

useSingleImageUploader.defaultProps = {
  defaultImage: "",
};

export default useSingleImageUploader;
