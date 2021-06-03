import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

/* eslint-disable */
const defaultProps = {
  className: "",
  size: 100,
  width: 100,
};

const proptypes = {
  className: PropTypes.string,
  size: PropTypes.any,
};

const Loader = ({ size, className }) => {
  return (
    <Spinner
      className={`${className}`}
      variant="primary-light"
      animation="border"
      role="status"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

Loader.defaultProps = defaultProps;

Loader.propTypes = proptypes;

export default Loader;
