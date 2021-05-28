import React from "react";
import { Link } from "react-router-dom";

const SectionTitle = ({ rootClassName, title, actionText }) => {
  return (
    <div
      className={`sectionTitle sectionBorderBottom mb50 pb20 ${rootClassName} `}
    >
      <div className="sectionTitleText">
        <h2>{title}</h2>
      </div>
      <div className="sectionTitleAction">
        <Link to="/shop">{actionText}</Link>
      </div>
    </div>
  );
};

export default SectionTitle;
