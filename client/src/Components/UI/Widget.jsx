import { Square } from "phosphor-react";
import React from "react";

const Widget = ({ icon, caption, value, color, valueTag }) => {
  let ValueTag = "h2";

  if (valueTag) {
    ValueTag = valueTag;
  }

  return (
    <div className="d-flex flex-column align-items-center align-items-md-start">
      <div>
        <h6 className="text-spacing-1 text-gray-600">{caption}</h6>
      </div>
      <div className="d-flex align-items-center mt-3">
        <div className={`text-${color} mr-2`}> {icon}</div>
        <div className="text-wrap">
          <ValueTag className="text-dark text-capitalize text-spacing-0 ">
            {value}
          </ValueTag>
        </div>
      </div>
    </div>
  );
};

Widget.defaultProps = {
  color: "primary",
  caption: "caption",
  value: "0",
  isSmallValue: null,
  icon: <Square size={60} className="text-danger" />,
};

export default Widget;
