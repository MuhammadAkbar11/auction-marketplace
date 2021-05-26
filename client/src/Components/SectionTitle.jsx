import React from "react";
import { Link } from "react-router-dom";

const SectionTitle = ({ title, actionText }) => {
  return (
    <div className="sectionTitle sectionBorderBottom mb50 pb20 ">
      <div className="sectionTitleText">
        <h2 className=" text-gray-800">{title}</h2>
      </div>
      <div className="sectionTitleAction">
        <Link to="/shop">{actionText}</Link>
      </div>
    </div>
  );
};

export default SectionTitle;
