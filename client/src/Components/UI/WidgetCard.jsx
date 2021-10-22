import React from "react";
import { Card } from "react-bootstrap";

const WidgetCard = ({
  icon,
  variant,
  color,
  caption,
  value,
  footer,
  bordered,
}) => {
  return (
    <>
      <Card className={` bg-white ${!bordered && "shadow-sm border-0"} pb-2`}>
        <Card.Body className="widget-card px-3 ">
          <div
            className={`widget-card-icon  text-white bg-${variant} text-${color}`}
          >
            {icon}
          </div>
          <div className="ml-3  flex-grow-1 d-flex justify-content-start text-black-50 flex-column align-items-end">
            <p className="my-0">{caption}</p>
            <h2 className=" text-spacing-1 font-weight-light ">{value}</h2>
          </div>
        </Card.Body>
        {footer && (
          <Card.Footer className="bg-transparent">{footer}</Card.Footer>
        )}
      </Card>
    </>
  );
};

WidgetCard.defaultProps = {
  bordered: false,
  footer: null,
  variant: "success",
  color: "text-white",
  iconClass: "bg-success color-white",
};

export default WidgetCard;
