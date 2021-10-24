import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const CardAlert = ({
  variant,
  headerCaption,
  title,
  children,
  action,
  linkAction,
}) => {
  return (
    <Card className={`bg-${variant}`}>
      <Card.Header className="bg-transparent py-3 text-uppercase ">
        {headerCaption}
      </Card.Header>
      <Card.Body className="py-3 px-4">
        <Card.Title>{title}</Card.Title>
        {children}
        {action && (
          <Link className="btn btn-primary btn-md" to={linkAction.url}>
            {linkAction.text}
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default CardAlert;
