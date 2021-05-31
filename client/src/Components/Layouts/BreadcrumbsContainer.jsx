import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";

const BreadcrumbContainer = ({ items }) => {
  return (
    <div className="breadcrumb-area bg-gray-200 mt20  ">
      <Container>
        <div className="breadcrumb-content text-center">
          <ul>
            {items.map((item, index) => {
              const key = index;
              return !item.active ? (
                <li key={item.url}>
                  <Link to={item.url}>{item.title}</Link>
                </li>
              ) : (
                <li key={index} className="active">
                  {item.title}{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </div>
  );
};

BreadcrumbContainer.defaultProps = {
  parentClass: "",
  items: "",
};

export default BreadcrumbContainer;
