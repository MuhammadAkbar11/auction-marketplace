import React from "react";

const ToastContainer = ({ position, children }) => {
  //  let classXPosition = "top-right"

  return <div className={`toast-container ${position} `}>{children}</div>;
};

export default ToastContainer;
