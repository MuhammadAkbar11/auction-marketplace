import React from "react";
import { Card } from "react-bootstrap";

const SimpleWidgetCard = ({ textColor, variant, color, caption, value }) => {
  let variantClass = `border-0 bg-${color}`;

  switch (variant) {
    case "outlined":
      variantClass = `border bg-trasparent border-${color}`;
      break;
    default:
      variantClass = variantClass;
      break;
  }

  return (
    <Card className={` rounded ${variantClass} ${textColor} `}>
      <Card.Body className=" text-center px-3 py-3 ">
        <h2 className={`text-spacing-0 mb-0 ${value?.className}`}>
          {value?.text}
        </h2>
        <p className={`my-0 ${caption?.className} `}>{caption?.text}</p>
      </Card.Body>
    </Card>
  );
};

SimpleWidgetCard.defaultProps = {
  variant: "filled",
  footer: null,
  textColor: "text-gray-400",
  color: "primary",
};

export default SimpleWidgetCard;
