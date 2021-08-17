import React from "react";

const useImagesUploader = props => {
  const [images, setImages] = React.useState(props || []);

  const handleFile = files => {
    const newFiles = [...files].map(file => {
      return {
        file: file,
        url: URL.createObjectURL(file),
      };
    });

    setImages(prevState => [...newFiles, ...prevState]);
  };

  const handleRemoveImage = value => {
    const imageArr = [...images];
    const findIndex = imageArr.indexOf(value);
    if (findIndex > -1) {
      imageArr.splice(findIndex, 1);
    }

    setImages(imageArr);
  };

  const handleDragOver = event => {
    event.preventDefault();
  };

  const handleDrop = event => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();

    let imageFile = event.dataTransfer.files;
    handleFile(imageFile);
  };

  return { images, handleFile, handleDragOver, handleDrop, handleRemoveImage };
};

export default useImagesUploader;
